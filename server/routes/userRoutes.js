const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');

// On front end, user should be alerted that account was successfully created and redirected to the login page
Router
    .route('/signup')
    .post(userController.createUser,
        (req, res) => {
            return res.sendStatus(200).json({ status: 'Registration Successful' });
        });

// Login in Route should redirect home if passing, otherwise to signup 
Router
    .route('/login')
    .post(userController.verifyUser,
        authenticationController.createCookie,
        (req, res) => {
            return res.sendStatus(200);
        });

Router
    .route('/logout')
    .post(authenticationController.clearCookie,
        (req, res) => {
            return res.status(200).redirect('/welcome');
        });

// could use in the top most component with conditional rendering to verify cookie and user
Router
    .route('/verifyUser')
    .get(authenticationController.verifyCookie, (req, res) => {
        return res.status(200).send(res.locals.verified)
    });

module.exports = Router;