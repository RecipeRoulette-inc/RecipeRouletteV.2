const pool = require('../database/connectToDb');
const jwt = require('jsonwebtoken');

const uploadRecipeController = {};

uploadRecipeController.uploadRecipe = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { ingredients, instructions, diets, country_origin, allergens, image, recipe_name } = req.body;

    const addRecipeQuery = `INSERT INTO uploaded_recipes (user_recipe_id, ingredients, instructions, diets, country_origin, allergens, image, user_id, recipe_name)
    VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [ingredients, instructions, diets, country_origin, allergens, image, user_id, recipe_name];

    try {
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

module.exports = uploadRecipeController;