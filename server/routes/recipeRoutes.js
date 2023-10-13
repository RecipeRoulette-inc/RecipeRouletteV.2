const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController')

// app.use()
// GET POST PATH 

// Router
//   .route('/randomRecipe')
//   .get(recipeController.getRandomRecipe, 
//   (req, res) => {
//     console.log('PRE SEND BACK YOOOOOO')
//     return res.status(200).send(res.locals.randomRecipe)
//   })

Router.
  route('/randomRecipe')
  .post((req, res) => {
    console.log('Post Route')
  console.log(req.body);
})

Router
  .route('/getRecipeInformationBulk')
  .get(authenticationController.verifyCookie,
  recipeController.getRecipeInformationBulk,
  (req,res) => {
    console.log('Search Recipe Complete')
    return res.status(200).send(res.locals.bulkRecipeInformation)
  }
)

Router
  .route('/searchRecipes')
  .get(authenticationController.verifyCookie,
  recipeController.searchRecipes,
  (req,res) => {
    console.log('Search Recipe Complete')
    console.log(res.locals.recipes)
    return res.status(200).send(res.locals.recipes)
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