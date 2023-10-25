// import database connection
const pool = require('../database/connectToDb');
const jwt = require('jsonwebtoken');

const profileController = {};

/* for the array data types, there's no automatic conversion of psql arrays to strings on front end. We will have to use array logic to use the response body */

// SAVE RECIPES FUNCTIONALITY 
profileController.getSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const getSavedRecipeQuery = `SELECT saved_recipes
    FROM user_preferences
    WHERE user_id = $1`;

    const value = [user_id];

    try {
        const result = await pool.query(getSavedRecipeQuery, value);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No saved recipes found' });
        };

        res.locals.savedRecipes = result.rows;
        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred getting the saved recipes',
            status: 500,
            message: {
                err: 'Error in profileController.getSavedRecipes'
            },
        });
    };
};

profileController.addSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const { recipe_id } = req.body;

    const addSavedRecipeQuery = `UPDATE user_preferences
    SET saved_recipes = ARRAY_APPEND(saved_recipes, $1)
    WHERE user_id = $2
    RETURNING saved_recipes`;

    const values = [recipe_id, user_id];

    try {
        const result = await pool.query(addSavedRecipeQuery, values);

        if (result.rows.length > 0) {
            return res.status(400).json({ error: 'Recipe already exists' });
        }
        res.locals.addRecipe = result.rows;
        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred adding to saved recipes',
            status: 500,
            message: {
                err: 'Error in profileController.addSavedRecipes', error
            },
        });
    };
};

profileController.deleteSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { recipe_id } = req.body;

    const deleteSavedRecipesQuery = `UPDATE user_preferences
    SET saved_recipes = ARRAY_REMOVE(saved_recipes, $1)
    WHERE user_id = $2`;

    const values = [recipe_id, user_id];

    try {
        const result = pool.query(deleteSavedRecipesQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Could not find saved recipe to delete' });
        }

        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred deleteing a saved recipe',
            status: 500,
            message: {
                err: 'Error in profileController.deleteSavedRecipes', error
            },
        });
    };
};

// ALLERGIES FUNCTIONALITY - do we want crud for all of these?
profileController.getAllergies = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const getAllergiesQuery = `SELECT allergies
    FROM user_preferences
    WHERE user_id = $1`;

    const values = [user_id];

    try {
        const result = await pool.query(getAllergiesQuery, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Could not get allergies' });
        };
        console.log(result, 'allergies data');
        res.locals.allergies = result.rows;
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in getting allergies',
            status: 500,
            message: {
                err: 'Error in profileController.getAllergies', error
            },
        });
    };
};

profileController.addAllergies = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const { allergy } = req.body;
    const addAllergiesQuery = `UPDATE user_preferences
    SET allergies = ARRAY_APPEND(allergies, $1)
    WHERE user_id = $2`;
    const values = [allergy, user_id];

    try {
        const result = await pool.query(addAllergiesQuery, values);
        console.log(result.rows);
        res.locals.addAllergy = result.rows;
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in adding allergy',
            status: 500,
            message: {
                err: 'Error in profileController.addAllergies', error
            },
        });
    };
};

profileController.deleteAllergies = async (req, res, next) => {
    const id = req.params.id //?
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const deleteAllergyQuery = `UPDATE user_preferences
    SET allergies = ARRAY_REMOVE(allergies, $1)
    WHERE user_id = $2
    RETURNING saved_recipes`;
    const values = [id, user_id];

    try {
        const result = pool.query(deleteAllergyQuery, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Could not find saved recipe to delete' });
        }
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in deleting allergy',
            status: 500,
            message: {
                err: 'Error in profileController.deleteAllergies', error
            },
        });
    };
};

module.exports = profileController; 