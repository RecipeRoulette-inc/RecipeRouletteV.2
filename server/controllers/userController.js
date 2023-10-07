//Import User Model

const userController = {};

userController.createUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
        // How can we create a pop up for an invalid username or password?
        if(!username || !password){
            console.log('missing username and/or password')
        }
        // the 'User' in this case will be the model Christina creates, we'll create a new one in the DB based off inputs
        const newUser = await User.create({
            username: username,
            password: password,
          });

        // persist user information to assign cookie / JWT
          res.locals.user = newUser;
          return next()

    } catch (error) {
        return next({
            log: "Error occurred creating the user",
            status: 400,
            message: { error: "Error in createUser controller" },
          })
    }
}

userController.verifyUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        // How should we search for the user in the DB?

        // findOne, findByID? 
        // persist user info for cookie w same res.locals name
        res.locals.user = user;
        return next()
    } catch (error) {
        return next ({
            log: "Error occurred logging in the user",
            status: 400,
            message: { error: "Error in verifyUser controller" },
          })
    }
}

module.exports = userController;