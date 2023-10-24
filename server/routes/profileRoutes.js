const express = require('express'); 
const Router = express.Router();
const profileController = require('../controllers/profileController');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const db = require('../database/connectToDb');
const crypto = require('crypto');
require('dotenv').config();

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

const photoName = crypto.randomBytes(32).toString('hex');


Router
  .route('/userInfo')
  .get(profileController.getUserId, profileController.getUserInfo, async (req, res) => {

    const getObjectParams = {
        Bucket: bucketName,
        Key: 'download.png'
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    console.log('url', url);
    res.locals.userInfo.image = url;
    console.log('res locals', res.locals.userInfo);

    res.status(200).send(res.locals.userInfo);

  });

  Router   
    .route('/uploadPhoto')
    .post(upload.single('image'), async (req, res) => {

        const params = {
            Bucket: bucketName,
            Key: photoName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
    
        const command = new PutObjectCommand(params)
    
        await s3.send(command);
        
        const text = 'INSERT INTO photo (photo_name) VALUES ($1);';
    
        await db.query(text, [photoName]);

        res.sendStatus(200);
    
      })




module.exports = Router