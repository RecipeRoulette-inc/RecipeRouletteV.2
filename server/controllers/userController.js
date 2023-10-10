//Import User Model
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const userController = {};

userController.createUser = async (req, res, next) => {
    console.log('createUser');
    try {
        const { username, password } = req.body;
        // How can we create a pop up for an invalid username or password?
        if(!username || !password){
            console.log('missing username and/or password')
        }

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
        const user = await User.findOne({ username: username})
        if(!user){
            console.log('Invalid Username, please sign up')
        } else {
            // console.log('preCrypt')
            bcrypt.compare(password, user.password).then((result)=>{
                if(result){
                    // persist user info for cookie w same res.locals name
                    res.locals.user = user
                    return next()
                }
            })
        }
    } catch (error) {
        return next ({
            log: "Error occurred logging in the user",
            status: 400,
            message: { error: "Error in verifyUser controller" },
          })
    }
}

module.exports = userController;