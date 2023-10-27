const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController');

Router.
  route('/randomRecipe')
  .post((req, res) => {
    console.log('Post Route')
    console.log(req.body);
  });

Router
  .route('/randomRecipe')
  .get(recipeController.getRandomRecipe, 
  (req, res) => {
    //console.log('RES HERE', res)
    return res.status(200).send(res.locals.randomRecipe)
  })

Router
  .route('/getRecipeInformationBulk')
  .get(recipeController.getRecipeInformationBulk,
  (req,res) => {
    console.log('Search Recipe Complete')
    return res.status(200).send(res.locals.bulkRecipeInformation)
  }
)

Router
  .route('/getRecipeInformationBulk/:id')
  .get(recipeController.getRecipeInformationBulk,
  (req,res) => {
    console.log('Search Recipe Complete :id')
    return res.status(200).json(res.locals.getRecipeInfo)
  }
)

Router
  .route('/searchRecipes')
  .post(recipeController.searchRecipes,
  (req,res) => {
    console.log('Search Recipe Complete')
    // console.log(res.locals.recipes)
    return res.status(200).json(res.locals.recipes)
  }
)

Router
  .route('/updateSavedRecipes')
  .patch(authenticationController.verifyCookie,
  recipeController.updateSavedRecipes,
  (req, res) => {
    console.log('Out of Controllers for Save Recipe')
    return res.status(200).send('Hi Pal')
  }
)

Router.route('/test').get((req, res) => {
  console.log('test passed')
  res.status(200).json('You shall pass')
})

Router
  .route('/nutritionLabel/:recipeId')
  .get(recipeController.getRecipeNutritionLabel, 
  (req, res) => {
    //console.log('RES HERE', res)
    return res.status(200).send(res.locals.nutritionLabel)
})

Router.route('/searchByIngredients')
.patch(recipeController.searchByIngredient,
  (req, res) => {
    return res.status(200).send(res.locals.searchResults)
  })


// Router.route('/fetchHomepage')
// .get(recipeController.checkCachedHomepage,
//   recipeController.refreshHomepage,
//   recipeController.saveNewHomepage,
//   (req, res) => {
//     return res.status(200).send(res.locals.searchResults)
//   })


Router.route('/testHomepage')
.get(recipeController.updateHomepageCache, (req, res) => {return res.status(200).send(res.locals.json)})

module.exports = Router; 