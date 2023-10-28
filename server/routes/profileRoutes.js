const express = require('express');
const Router = express.Router();
const profileController = require('../controllers/profileController');
const saveRecipesController = require('../controllers/saveRecipesController');
const uploadRecipeController = require('../controllers/uploadRecipeController');

// const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
// const crypto = require('crypto');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
//   region: bucketRegion,
// })

// const photoName = crypto.randomBytes(32).toString('hex');


Router
  .route('/userInfo')
  .get(profileController.getUserId, profileController.getUserInfo, profileController.getImageURL, profileController.getPreferences, profileController.getUploadedRecipes, (req, res) => {

    // const getObjectParams = {
    //     Bucket: bucketName,
    //     Key: 'download.png'
    // }

    // const command = new GetObjectCommand(getObjectParams);
    // const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    // console.log('url', url);
    // res.locals.userInfo.image = url;
    // console.log('res locals', res.locals.userInfo);

    res.status(200).send(res.locals.userInfo);
  });

Router
  .route('/uploadPhoto')
  .post(upload.single('image'), profileController.getUserId, profileController.getUserInfo, profileController.uploadImage, profileController.removeImage, (req, res) => {

    // const params = {
    //     Bucket: bucketName,
    //     Key: photoName,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype,
    // }

    // const command = new PutObjectCommand(params)

    // await s3.send(command);

    // const text = 'INSERT INTO photo (photo_name) VALUES ($1);';

    // await db.query(text, [photoName]);

    res.redirect('/');
  });

// CODE FOR SAVING RECIPES 
Router.
  route('/getSavedRecipes')
  .get(saveRecipesController.getSavedRecipes,
    (req, res) => {
      return res.status(200).json(res.locals.savedRecipes);
    });

Router.
  route('/addSavedRecipes')
  .post(saveRecipesController.addSavedRecipes,
    (req, res) => {
      return res.status(200).json(res.locals.addRecipe);
    });

Router.
  route('/deleteSavedRecipes')
  .delete(saveRecipesController.deleteSavedRecipes,
    (req, res) => {
      return res.status(200).send('Success: Deleted Recipe');
    });

// CODE FOR UPLOADING RECIPES
Router.
  route('/uploadRecipe')
  .post(upload.single('image'), uploadRecipeController.uploadRecipe,
    (req, res) => {
      return res.status(200).json(res.locals.uploadedRecipes);
    });

Router.
  route('/deleteUploadedRecipe')
  .delete(uploadRecipeController.deleteUploadedRecipe,
    (req, res) => {
      return res.status(200).send('Success: Deleted Uploaded Recipe');
    });

// Router.
//   route('/uploadRecipeImage')
//   .post(upload.single('image'), uploadRecipeController.getRecipeImage, uploadRecipeController.getImageURL,
//     (req, res) => {
//       return res.status(200).send('Success: Uploaded Recipe Image');
//     });

module.exports = Router;

//uploadRecipeController.getImageURL, uploadRecipeController.uploadImage,