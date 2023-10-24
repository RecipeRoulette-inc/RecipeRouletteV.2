const express = require('express'); 
const Router = express.Router();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const db = require('../models/dbModel');
const crypto = require('crypto');


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

Router.post('/uploadImage', upload.single('image'), async (req, res) => {

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

    res.redirect('/');

  })


  Router.get('/displayImage', async (req, res) => {

    console.log('get url middleware')

    // const text = 'SELECT * FROM photo WHERE photo_name = $1;';

    // db.query(text, ['download.png'])

    const getObjectParams = {
        Bucket: bucketName,
        Key: 'download.png'
    }


    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

    console.log(url)

    return res.send({url: url, text: 'this is a test'})

  })

  module.exports = Router;