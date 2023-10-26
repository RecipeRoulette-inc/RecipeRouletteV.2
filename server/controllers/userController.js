const bcrypt = require('bcrypt');
const userController = {};
const pool = require('../database/connectToDb');

userController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    const currentTimestamp = new Date().toISOString();

    if (!username || !password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    };

    try {
        // create a conditional to see if user already exists
        const existingUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if (existingUser.rowCount >= 1) {
            return res.status(401).json({ error: 'User already exists' });
        };

        // generate bcrypt here to hash the password 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // create new user into database
        const createUserQuery = `INSERT INTO users (username, password, created_at) VALUES ($1, $2, $3) RETURNING *`;
        const values = [username, bcryptPassword, currentTimestamp];
        const newUser = await pool.query(createUserQuery, values);
        const user_id = newUser.rows[0].user_id;

        //add the new user in user_preferences table
        const createUserPref = `INSERT INTO user_preferences (user_pref_id, saved_recipes, allergies, dietary_restrictions, user_id, recipes_id) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5) RETURNING *`;
        const profileValues = [null, null, null, user_id, null];
        await pool.query(createUserPref, profileValues);

        res.locals.user = newUser;
        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred creating the user',
            status: 500,
            message: { err: `Error in userController.createUser` },
        });
    };
};

userController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    };

    const existingUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (existingUser.rowCount === 0) {
        return res.redirect('/signup');
    };

    console.log('Made it to bcrypt in userController.verifyUser');

    try {
        bcrypt
            .compare(password, existingUser.rows[0].password)
            .then((result) => {
                if (result === false) {
                    return next({
                        log: 'Incorrect username or password',
                        status: 401,
                        message: { err: 'Incorrect username or password' }
                    });
                } else {
                    console.log('Bcrypt compare successful');
                    res.locals.user_id = existingUser.rows[0].user_id;
                    return next();
                }
            });
    } catch (error) {
        return next({
            log: 'Error occurred verifying the user',
            status: 500,
            message: { err: 'Error in userController.verifyUser controller' },
        });
    };
};

module.exports = userController;