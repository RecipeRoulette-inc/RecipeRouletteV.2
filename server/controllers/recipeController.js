const SpoonacularApi = require('spoonacular_api');

const defaultClient = SpoonacularApi.ApiClient.instance;

const apiKeyScheme = defaultClient.authentications['apiKeyScheme']; 
apiKeyScheme.apiKey = process.env.API_KEY
console.log(apiKeyScheme)
console.log(process.env.API_KEY)
const apiInstance = new SpoonacularApi.RecipesApi();

// JC Imports: To save recipe and update existing userDoc. Can move import and method to userController if more appropriate
const User = require('../models/userModel');

let opts = {
  'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
  'number': 1 // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
};

const recipeController = {}; 

recipeController.getRandomRecipe = (req, res, next) => {
  console.log('searchRecipes');

  apiInstance.getRandomRecipes(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + console.log(JSON.stringify(data, null, 2)));
    }
  });

} 

// JC New Code: Update savedRecipes property on userDoc
recipeController.updateSavedRecipes = async (req, res, next) => {
  try {
    const { savedRecipes } = req.body;
    
    // JC: Example variable from cookies to query DB for this specific user. 
    const { username } = req.cookies;

    const userDoc = await User.findOneAndUpdate({ username: username }, { $set: { savedRecipes: savedRecipes } }, { new: true });
    return next();
  }
  catch(err) {
    return next({
      log: 'Error occured in recipeController.updateSavedRecipes',
      status: 400,
      message: { err: `recipeController.updateSavedRecipes: ${err}` }
    });
  }
}




module.exports = recipeController;