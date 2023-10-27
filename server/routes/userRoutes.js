const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');

Router
    .route('/signup')
    .post(userController.createUser,
        (req, res) => {
            return res.status(200).redirect('/home');
        });

Router
    .route('/login')
    .post(userController.verifyUser,
        authenticationController.createCookie,
        (req, res) => {
            return res.sendStatus(200)
        })

Router
    .route('/logout')
    .post(authenticationController.verifyCookie,
        authenticationController.clearCookie,
        (req, res) => {
            return res.status(200).redirect('/welcome')
        });

module.exports = Router;