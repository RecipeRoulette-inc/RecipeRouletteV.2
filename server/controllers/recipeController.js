const SpoonacularApi = require('spoonacular_api');

const defaultClient = SpoonacularApi.ApiClient.instance;

const apiKeyScheme = defaultClient.authentications['apiKeyScheme']; 
apiKeyScheme.apiKey = process.env.API_KEY
console.log(apiKeyScheme)
console.log(process.env.API_KEY)
const apiInstance = new SpoonacularApi.RecipesApi();

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

recipeController.saveRecipe = (req, res, next) => {
  console.log(req.body)
  const { recipe } = req.body;
  
}


module.exports = recipeController;