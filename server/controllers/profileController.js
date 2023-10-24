const pool = require('../database/connectToDb');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

const profileController = {};

profileController.getUserId = async (req, res, next) => {

    const token = req.cookies.SSID;
    tokenBody = jwt.decode(token, {complete: true})
    res.locals.user_id = tokenBody.payload.user_id;
    //console.log('user_id', tokenBody.payload.user_id);

    return next();

}

profileController.getUserInfo = async (req, res, next) => {

    const user_id = res.locals.user_id;
    const text = 'SELECT username FROM users WHERE user_id =$1;';
    
    pool.query(text, [user_id])
      //.then((data) => console.log('user data', data.rows[0].username))
      .then((data) => {
        console.log('data.rows', data.rows[0].username)
        res.locals.userInfo = {
            // image: image, 
            username: data.rows[0].username
        }
    })
    .then((data) => console.log('res.locals', res.locals.userInfo))
    .then(() => next());

};

module.exports = profileController;