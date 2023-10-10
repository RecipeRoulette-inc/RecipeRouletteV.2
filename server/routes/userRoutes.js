const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')
const authenticationController = require('../controllers/authenticationController')

// Sign Up Routes should redirect home if passing all middleware
Router.post('/signup', 
    userController.createUser, 
    authenticationController.createCookie, 
    (req,res) => {
        console.log('successfully created user')
        console.log('---Req.body', req);
        console.log('---Res.body', res);
    return res.status(200).redirect('/home')
})

// Login in Route should redirect home if passing, otherwise to signup 
Router.post('/login', 
    userController.verifyUser, 
    authenticationController.createCookie, 
    (req,res) => {
    return res.status(200).redirect('/home')
})

Router.post('/logout', 
    authenticationController.clearCookie, 
    (req, res) => {
    return res.status(200).redirect('/welcome')
})

module.exports = Router;