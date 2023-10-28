const pool = require('../database/connectToDb');
const jwt = require('jsonwebtoken');

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');

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
});

const uploadRecipeController = {};

uploadRecipeController.uploadRecipe = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const { ingredients, instructions, diets, country_origin, allergens, recipe_name } = JSON.parse(req.body.json);

    console.log(req.body, 'req.body');
    console.log(req.body.json, 'req.body.json');

    const imageFile = req.file;

    try {
        let imageKey = null;
        if (imageFile) {
            const photoName = crypto.randomBytes(32).toString('hex');
            const params = {
                Bucket: bucketName,
                Key: photoName,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype,
            }
            const command = new PutObjectCommand(params)
            await s3.send(command);
            imageKey = photoName;
        };
        const addRecipeQuery = `INSERT INTO uploaded_recipes (user_recipe_id, ingredients, instructions, diets, country_origin, allergens, user_id, recipe_name, image)
        VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        const values = [ingredients, instructions, diets, country_origin, allergens, user_id, recipe_name, imageKey];

        console.log(values, 'values');

        const result = await pool.query(addRecipeQuery, values);
        res.locals.uploadedRecipes = result.rows[0];
        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred adding a new recipe',
            status: 500,
            message: {
                err: 'Error in uploadRecipeController.addRecipe'
            },
        });
    };
};

uploadRecipeController.deleteUploadedRecipe = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { user_recipe_id } = req.body;

    const deleteUploadedRecipeQuery = `DELETE FROM uploaded_recipes
    WHERE user_recipe_id = $1
    AND user_id = $2`;

    const values = [user_recipe_id, user_id];

    try {
        const result = await pool.query(deleteUploadedRecipeQuery, values);

        if (result.rowCount <= 0) {
            return res.status(404).json({ error: 'Could not find uploaded recipe to delete' });
        }

        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred deleting an uploaded recipe',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.deleteUploadedRecipes'
            },
        });
    };
};

// uploadRecipeController.getRecipeImage = async (req, res, next) => {
//     const token = req.cookies.SSID;
//     const tokenBody = jwt.decode(token, { complete: true });
//     const user_id = tokenBody.payload.user_id;
//     const { recipe_id } = req.body

//     const getRecipeImgQuery = 'SELECT image FROM uploaded_recipes WHERE user_id = $1 AND user_recipe_id = $2;';

//     try {
//         const res = await pool.query(getRecipeImgQuery, [user_id, recipe_id]);
//         console.log(res.rows[0].image, 'img reslocals');
//         res.locals = res.locals || {};
//         res.locals.recipeImg = res.rows[0].image;
//         return next();
//     } catch (error) {
//         console.error('Error executing query:', error);
//         return next({
//             log: 'Error occurred getting an uploaded recipe image',
//             status: 500,
//             message: {
//                 err: 'Error in uploadRecipeController.getRecipeImage'
//             },
//         });
//     };
// };


// uploadRecipeController.getImageURL = async (req, res, next) => {
//     try {
//         const imageName = res.locals.recipeImg;
//         const getObjectParams = {
//             Bucket: bucketName,
//             Key: imageName
//         };
//         const command = new GetObjectCommand(getObjectParams);
//         const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
//         console.log(url, 'img for upload recipe');
//         res.locals.recipeImgURL = url;
//         return next();
//     } catch (err) {
//         return next({
//             log: 'Error occured in uploadRecipeController.getImageURL',
//             status: 500,
//             message: { err: `uploadRecipeController.getImageURL: ${err}` }
//         });
//     };
// };

// uploadRecipeController.uploadImage = async (req, res, next) => {
//     try {
//         const photoName = crypto.randomBytes(32).toString('hex');
//         const oldPhoto = res.locals.recipeImg;
//         const text = 'UPDATE uploaded_recipes SET image = $1 WHERE image = $2;'

//         const params = {
//             Bucket: bucketName,
//             Key: photoName,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         }
//         const command = new PutObjectCommand(params)
//         await s3.send(command);
//         await pool.query(text, [photoName, oldPhoto])
//         return next();
//     } catch (err) {
//         return next({
//             log: 'Error occured in uploadRecipeController.uploadImage',
//             status: 400,
//             message: { err: `uploadRecipeController.uploadImage: ${err}` }
//         });
//     };
// };


module.exports = uploadRecipeController;