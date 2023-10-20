const express = require('express'); 
const Router = express.Router();
const photoController = require('../controllers/photoController')
const { S3Client, PutObjectCommand  } = require("@aws-sdk/client-s3");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

upload.single('image');


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

Router
    .route('/uploadImage')
    .post(
        async (req, res) => {

        console.log('upload middleware')

    // const params = {
    //     Bucket: bucketName,
    //     Key: req.file.originalname,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype,
    // }

    // const command = new PutObjectCommand(params)

    // await s3.send(command);

   res.sendStatus(200);

  })

  module.exports = Router;