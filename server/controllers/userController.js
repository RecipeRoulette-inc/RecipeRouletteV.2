const bcrypt = require('bcrypt');
const userController = {};
// import database connection
const pool = require('../database/connectToDb');

userController.createUser = async (req, res, next) => {
    const { username, password, email } = req.body;
    const currentTimestamp = new Date().toISOString();

    // how can we create a pop up for an invalid username or password?
    if (!username || !password || !email) {
        return res.status(401).send('Invalid username, password, or email');
    };

    try {
        // create a conditional to see if user already exists
        const existingUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if (existingUser.rowCount >= 1) {
            return next({
                log: 'User already exists',
                status: 401,
                message: { err: 'Error: User already exists' }
            });
        };

        // generate bcrypt here to hash the password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // create new user into database
        const createUserQuery = `INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4)`;
        const values = [username, email, bcryptPassword, currentTimestamp];
        const newUser = await pool.query(createUserQuery, values);

        // persist user information to assign cookie / JWT 
        //reroute to login page instead of storing user 
        res.locals.user = newUser;

        return next();
    } catch (error) {
        return next({
            log: 'Error occurred creating the user',
            status: 500,
            message: { err: `Error in userController.createUser`, error },
        });
    };
}

userController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).send('Invalid username or password');
    };

    // find the user in db
    const existingUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    // console.log(existingUser, 'existing user');
    if (existingUser.rowCount === 0) {
        res.redirect('/signup');
    };

    console.log('made it to bcrypt in userController.verifyUser');

    try {
        bcrypt
            .compare(password, existingUser.rows[0].password)
            .then((result) => {
                if (result === false) {
                    return next({
                        log: 'Incorrect username or password',
                        status: 401,
                        message: { err: 'Error: Incorrect username or password' }
                    });
                } else {
                    console.log('Bcrypt compare successful');
                    res.locals.user_id = existingUser.rows[0].user_id;
                    // console.log('user rows', res.locals.userId);
                    return next();
                }
            });
    } catch (error) {
        return next({
            log: 'Error occurred logging in the user',
            status: 500,
            message: { err: 'Error in verifyUser controller', error },
        });
    };
};

module.exports = userController;