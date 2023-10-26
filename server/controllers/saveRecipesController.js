// import database connection
const pool = require('../database/connectToDb');
const jwt = require('jsonwebtoken');

const saveRecipesController = {};

/* for the array data types, there's no automatic conversion of psql arrays to strings on front end.
 We will have to use array logic to use the response body */

// SAVE RECIPES FUNCTIONALITY  
// can replace getSavedRecipes with dane's functionality of GET for user_preference tables
saveRecipesController.getSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const getSavedRecipeQuery = `SELECT saved_recipes
    FROM user_preferences
    WHERE user_id = $1`;

    const value = [user_id];

    try {
        const result = await pool.query(getSavedRecipeQuery, value);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No saved recipes found' });
        };

        res.locals.savedRecipes = Array.from(new Set(result.rows[0].saved_recipes));
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred getting the saved recipes',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.getSavedRecipes'
            },
        });
    };
};

saveRecipesController.addSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { recipe_id } = req.body;

    const checkDuplicateQuery = `
        SELECT saved_recipes
        FROM user_preferences
        WHERE user_id = $1`;

    try {
        const checkResult = await pool.query(checkDuplicateQuery, [user_id]);
        const savedRecipes = checkResult.rows[0].saved_recipes;

        if (savedRecipes.includes(recipe_id)) {
            return res.status(400).json({ error: 'Recipe already exists' });
        }

        const addSavedRecipeQuery = `UPDATE user_preferences
        SET saved_recipes = ARRAY_APPEND(saved_recipes, $1)
        WHERE user_id = $2
        RETURNING saved_recipes`;

        const values = [recipe_id, user_id];

        const result = await pool.query(addSavedRecipeQuery, values);

        res.locals.addRecipe = result.rows[0].saved_recipes;
        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred adding to saved recipes',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.addSavedRecipes'
            },
        });
    };
};

saveRecipesController.deleteSavedRecipes = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { recipe_id } = req.body;

    const deleteSavedRecipesQuery = `UPDATE user_preferences
    SET saved_recipes = ARRAY_REMOVE(saved_recipes, $1)
    WHERE user_id = $2
    RETURNING saved_recipes`;

    const values = [recipe_id, user_id];

    try {
        const result = await pool.query(deleteSavedRecipesQuery, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Could not find saved recipe to delete' });
        }

        return next();
    } catch (error) {
        console.error('Error executing query:', error);
        return next({
            log: 'Error occurred deleteing a saved recipe',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.deleteSavedRecipes'
            },
        });
    };
};

// ALLERGIES FUNCTIONALITY - do we want crud for all of these?
saveRecipesController.getAllergies = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;

    const getAllergiesQuery = `SELECT allergies
    FROM user_preferences
    WHERE user_id = $1`;

    const values = [user_id];

    try {
        const result = await pool.query(getAllergiesQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No allergies found' });
        };
        console.log(result, 'allergies data');
        res.locals.allergies = result.rows[0].allergies;
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in getting allergies',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.getAllergies'
            },
        });
    };
};

saveRecipesController.addAllergies = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { allergy } = req.body;

    const checkDuplicateQuery = `
        SELECT allergies
        FROM user_preferences
        WHERE user_id = $1`;

    try {
        const checkResult = await pool.query(checkDuplicateQuery, [user_id]);
        const savedAllergies = checkResult.rows[0].allergies;

        if (savedAllergies.includes(allergy)) {
            return res.status(400).json({ error: 'Allergy already exists' });
        };

        const addAllergiesQuery = `UPDATE user_preferences
        SET allergies = ARRAY_APPEND(allergies, $1)
        WHERE user_id = $2
        RETURNING allergies`;

        const values = [allergy, user_id];

        const result = await pool.query(addAllergiesQuery, values);
        console.log(result.rows);
        res.locals.addAllergy = result.rows[0].allergies;
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in adding allergy',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.addAllergies'
            },
        });
    };
};

saveRecipesController.deleteAllergies = async (req, res, next) => {
    const token = req.cookies.SSID;
    const tokenBody = jwt.decode(token, { complete: true });
    const user_id = tokenBody.payload.user_id;
    const { allergy } = req.body;

    const deleteAllergyQuery = `UPDATE user_preferences
    SET allergies = ARRAY_REMOVE(allergies, $1)
    WHERE user_id = $2
    RETURNING allergies`;

    const values = [allergy, user_id];

    try {
        const result = await pool.query(deleteAllergyQuery, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Could not find allergy to delete' });
        }
        return next();
    } catch (error) {
        return next({
            log: 'Error occurred in deleting allergy',
            status: 500,
            message: {
                err: 'Error in saveRecipesController.deleteAllergies'
            },
        });
    };
};

module.exports = saveRecipesController; 