const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')
const authenticationController = require('../controllers/authenticationController')

// Sign Up Routes should redirect home if passing all middleware
Router
    .route('/signup')
    .post(userController.createUser, 
    authenticationController.createCookie, 
    (req,res) => {
    return res.sendStatus(200)
})

// Login in Route should redirect home if passing, otherwise to signup 
Router
    .route('/login')
    .post(userController.verifyUser, 
    authenticationController.createCookie, 
    (req,res) => {
    return res.sendStatus(200)
})

Router
    .route('/logout')
    .post(authenticationController.clearCookie, 
    (req, res) => {
    return res.status(200).redirect('/welcome')
})

module.exports = Router;