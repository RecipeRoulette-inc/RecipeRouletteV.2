const SpoonacularApi = require('spoonacular_api');

const Spoonacular = SpoonacularApi.ApiClient.instance;


const recipeController = {}; 

recipeController.query = (req, res, next) => {
  const searchQuery = 'burger';
  const searchOpts = {
    'number': 5,
    'ingredientsRequired': true,
    'addRecipeInformation': true,
    'addRecipeNutrition': true,
  }


  Spoonacular.searchRecipies(searchQuery, searchOpts, (error, data, response) => {
    if (error) {
      console.error('Search error: ', error);
    } else {
      const recipes = data.results;

      console.log('Found recipes: ', recipes);

    }
  });

} 




