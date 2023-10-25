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

}

profileController.getUserInfo = async (req, res, next) => {

    const user_id = res.locals.user_id;

    const text = 'SELECT username FROM users WHERE user_id =$1;';

    pool.query(text, [user_id])
      //.then((data) => console.log('user data', data.rows[0].username))
      .then((data) => {
        console.log('data.rows', data.rows[0].username)
        res.locals.userInfo = {
            image: data.rows[0].profile_image, 
            username: data.rows[0].username
        }
    })
    .then((data) => console.log('res.locals', res.locals.userInfo))
    .then(() => next());

};

profileController.getImageURL = async (req, res, next) => {

    const imageName = res.locals.userInfo.image;

    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName
        //Key: 'download.png'
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    res.locals.userInfo.imageURL = url;
    
    return next();
}

profileController.uploadImage = async (req, res) => {
// need to add logic to user signup that automatically inserts default filename into image field of each user

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

}

profileController.removeImage = async (req, res, next) => {

    const oldPhoto = res.locals.userInfo.image;

    const params = {
        Bucket: bucketName,
        Key: oldPhoto
    }

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    return next();

}

profileController.getPreferences = async (req, res, next) => {
    const user_id = res.locals.user_id;

    const text = 'SELECT * FROM user_preferences WHERE user_id=$1;'

    pool.query(text, [user_id])
      .then((data) => {
        res.locals.userInfo.savedRecipes = data.rows[0].saved_recipes,
        res.locals.userInfo.allergies = data.rows[0].allergies,
        res.locals.userInfo.restrictions = data.rows[0].dietary_restrictions
        })
      .then(() => {
        return next();
      });
};

module.exports = profileController;