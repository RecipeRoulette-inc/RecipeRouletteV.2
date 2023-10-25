const pool = require('../database/connectToDb');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const crypto = require('crypto');
require('dotenv').config();

app.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
})

const profileController = {};


profileController.getUserId = async (req, res, next) => {

    const token = req.cookies.SSID;
    tokenBody = jwt.decode(token, {complete: true})
    res.locals.user_id = tokenBody.payload.user_id;
    //console.log('user_id', tokenBody.payload.user_id);

    return next();

    };

profileController.getUserInfo = async (req, res, next) => {

    console.log('getUserInfo')

    const user_id = res.locals.user_id;

    const text = 'SELECT * FROM users WHERE user_id =$1;';

    pool.query(text, [user_id])
      //.then((data) => console.log('user data', data.rows[0].username))
      .then((data) => {
        res.locals.userInfo = {
            image: data.rows[0].profile_image, 
            username: data.rows[0].username
        }
      })
      .then((data) => console.log('res.locals', res.locals.userInfo))
      .then(() => next())
      .catch((err) => {
        console.log('An error occurred in the getUserInfo middleware.')
        return next((err) => err = {
            log: 'An error occurred in the getUserInfo middleware.'
        })
    });
    };


profileController.getImageURL = async (req, res, next) => {

    console.log('getImageURL')

  try {

    const imageName = res.locals.userInfo.image;

    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName
        //Key: 'download.png'
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    console.log(url);
    res.locals.userInfo.imageURL = url;
    
    return next();

 } catch(err) {
        return next({
          log: 'Error occured in profileController.getImageURL',
          status: 400,
          message: { err: `profileController.getImageURL: ${err}` }
        });
      }
};

profileController.uploadImage = async (req, res) => {
    console.log('entering upload image middleware');
    console.log('image file', req.file);

  try {

    const photoName = crypto.randomBytes(32).toString('hex');
    const oldPhoto = res.locals.userInfo.image;
    const text = 'UPDATE users SET image = $1 WHERE image = $2;'

    const params = {
        Bucket: bucketName,
        Key: photoName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command);
    await pool.query(text, [photoName, oldPhoto])

    next();

} catch(err) {
    return next({
      log: 'Error occured in profileController.uploadImage',
      status: 400,
      message: { err: `profileController.uploadImage: ${err}` }
    });
  }

};

profileController.removeImage = async (req, res, next) => {

  try {

    const oldPhoto = res.locals.userInfo.image;

    if (oldPhoto != 'download.png') {

    const params = {
        Bucket: bucketName,
        Key: oldPhoto
    }

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    return next();

    } else {

    return next();

    }

} catch(err) {
    return next({
      log: 'Error occured in profileController.removeImage',
      status: 400,
      message: { err: `profileController.removeImage: ${err}` }
    });
  }

}

profileController.getPreferences = async (req, res, next) => {

    // if (result.rowCount === 0) {
    //     return res.status(404).json({ error: 'No saved recipes found' });
    // };

  try {

    const user_id = res.locals.user_id;

    const text = 'SELECT * FROM user_preferences WHERE user_id=$1;'

    pool.query(text, [user_id])
      .then((data) => {
        if (data.rows[0].saved_recipes != null) {
          res.locals.userInfo.savedRecipes = data.rows[0].saved_recipes
        } else {
          res.locals.userInfo.savedRecipes = 'You have not saved any recipes yet.'
        }
        if (data.rows[0].allergies != null) {
            res.locals.userInfo.allergies = data.rows[0].allergies
        } else {
            res.locals.userInfo.allergies = 'You have not saved any allergies yet.'
          }
        if (data.rows[0].dietary_restrictions != null) {
            res.locals.userInfo.restrictions = data.rows[0].dietary_restrictions
        } else {
            res.locals.userInfo.restrictions = 'You have not saved any dietary restrictions yet.'
          }  
        })
      .then(() => {
        console.log ('user preferences', res.locals.userInfo)
        return next();
      });

    } catch(err) {
        return next({
          log: 'Error occured in profileController.getPreferences',
          status: 400,
          message: { err: `profileController.getPreferences: ${err}` }
        });
      }
};

module.exports = profileController;