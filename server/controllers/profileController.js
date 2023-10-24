// import database connection
const pool = require('../database/connectToDb');
const SpoonacularApi = require('spoonacular_api');
const defaultClient = SpoonacularApi.ApiClient.instance;

const apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = process.env.API_KEY
console.log(apiKeyScheme)
console.log(process.env.API_KEY)
const apiInstance = new SpoonacularApi.RecipesApi();

const profileController = {};

/* for the array data types, there's no automatic conversion of psql arrays to strings on front end. We will have to use array logic to use the response body */

// SAVE RECIPES FUNCTIONALITY 
profileController.getSavedRecipes = async (req, res, next) => {
    // access the profile connected to user_id and maybe jwt token/cookie?
    const user_id = req.cookies.SSID.user_id;
    // inner join was used to obtain the username -- dont know if we want to display that anywhere - or access it in the userController? 
    const getSavedRecipeQuery = `SELECT saved_recipes
    FROM user_preferences
    INNER JOIN users USING (users_id) 
    WHERE user_id = $1`;
    const value = [user_id];

    try {
        const result = await pool.query(getSavedRecipeQuery, value);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No saved recipes found' });
        }

        console.log(result, 'saved_Recips data');

        const savedRecipeIds = result.rows.map(row => row.saved_recipes);

        const opts = {
            'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
            'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
            'includeNutrition': true,
            'addRecipeInformation': true,
            'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
            'number': 1
        };

        apiInstance.getRecipeInformationBulk(savedRecipeIds, opts, (error, data, response) => {
            if (error) {
                console.error(error);
                return next({
                    log: 'Error occurred while fetching recipe information',
                    status: 500,
                    message: {
                        err: 'Error in profileController.getSavedRecipes',
                        error,
                    },
                });
            } else {
                res.locals.savedRecipes = data;
                return next();
            }
        });
    } catch (error) {
        return next({
            log: 'Error occurred getting the saved recipes',
            status: 500,
            message: {
                err: 'Error in profileController.getSavedRecipes', error
            },
        });
    };
};

profileController.addSavedRecipes = async (req, res, next) => {
    const { recipe_id } = req.body;
    const user_id = req.cookies.SSID.user_id;

    const addSavedRecipeQuery = `UPDATE user_preferences
    SET saved_recipes = ARRAY_APPEND(saved_recipes, $1)
    WHERE user_id = $2`;

    const values = [recipe_id, user_id];

    try {
        const result = await pool.query(addSavedRecipeQuery, values);
        console.log(result.rows);
        console.log(result, 'result in addsavedrecipes');
        res.locals.addRecipe = result.rows;
        return next();
    } catch (error) {
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
    // how would we want to access the recipe_id we want to delete?
    const recipe_id = req.params.id;
    const user_id = req.cookies.SSID.user_id;

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
        return next({
            log: 'Error occurred deleteing a saved recipe',
            status: 500,
            message: {
                err: 'Error in profileController.deleteSavedRecipes', error
            },
        });
    };
};

// do we even need to update the values in there? i think just deleteing, adding and getting is ok
profileController.updateSavedRecipes = async (req, res, next) => {
};

// ALLERGIES FUNCTIONALITY - do we want crud for all of these?
profileController.getAllergies = async (req, res, next) => {
    const user_id = req.cookies.SSID.user_id;
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
    const user_id = req.cookies.SSID.user_id;
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

profileController.updateAllergies = async (req, res, next) => {

};

profileController.deleteAllergies = async (req, res, next) => {
    const id = req.params.id //?
    const user_id = req.cookies.SSID.user_id;

    const deleteAllergyQuery = `UPDATE user_preferences
    SET allergies = ARRAY_REMOVE(allergies, $1)
    WHERE user_id = $2`;
    const values = [id, user_id];

    try {
        const result = pool.query(deleteAllergyQuery, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Could not find saved recipe to delete' });
        }
        return next();
    } catch (error) {

    }
};

// DIET FUNCTIONALLITY 
profileController.saveDiet = async (req, res, next) => {

};


module.exports = profileController; 