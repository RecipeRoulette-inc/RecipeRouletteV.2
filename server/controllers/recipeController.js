// const SpoonacularApi = require('reciperoulette');

// const Spoonacular = SpoonacularApi.ApiClient.instance;


const recipeController = {}; 

recipeController.searchRecipies = (req, res, next) => {
  console.log('searchRecipes');
  // const searchQuery = 'burger';
  // const searchOpts = {
  //   'number': 5,
  //   'ingredientsRequired': true,
  //   'addRecipeInformation': true,
  //   'addRecipeNutrition': true,
  // }


  // Spoonacular.searchRecipies(searchQuery, searchOpts, (error, data, response) => {
  //   if (error) {
  //     console.error('Search error: ', error);
  //   } else {
  //     const recipes = data.results;

  //     console.log('Found recipes: ', recipes);

  //   }
  // });

} 




module.exports = recipeController;