const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')

// Sign Up Routes should redirect home if passing all middleware
Router.post('/signup', userController.createUser, (req,res) => {
    return res.status(200).redirect('/home')
})

// Login in Route should redirect home if passing, otherwise to signup 
Router.post('/login', userController.verifyUser, (req,res) => {
    return res.status(200).redirect('/home')
})

module.exports = Router;