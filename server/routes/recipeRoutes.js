const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController')

// app.use()
// GET POST PATH 

Router
  .route('/randomRecipe')
  .get(recipeController.getRandomRecipe, 
  (req, res) => {
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
    console.log('Search Recipe Complete')
    return res.status(200).send(res.locals.bulkRecipeInformation)
  }
)

Router
  .route('/searchRecipes')
  .post(recipeController.searchRecipes,
  (req,res) => {
    console.log('Search Recipe Complete')
    console.log(res.locals.recipes)
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



module.exports = Router; 