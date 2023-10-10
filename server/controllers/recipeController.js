const SpoonacularApi = require('spoonacular-api-library')
const defaultClient = SpoonacularApi.ApiClient.instance;
const apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
// store this in .env later
apiKeyScheme.apiKey = "381bd0a555a044cab5991326e1ac33a9"
const api = new SpoonacularApi.DefaultApi()
const analyzeRecipeRequest = new SpoonacularApi.AnalyzeRecipeRequest();

recipeController = {};

recipeController.searchRecipes = async (req, res, next) => {
    try {

        return next()
    } catch (error) {
        return next({
            log: "Error occurred searching for the recipes",
            status: 400,
            message: { error: "Error in searchRecipes controller" },
          })
    }
}

module.exports = recipeController;