const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController')


Router.get('/randomRecipe', 
  authenticationController.verifyCookie,
  recipeController.getRandomRecipe, 
  (req, res) => {
    console.log('PRE SEND BACK YOOOOOO')
    return res.status(200).send(res.locals.randomRecipe)
  })

Router.get('/searchRecipes',
authenticationController.verifyCookie,
recipeController.searchRecipes,
  (req,res) => {
    console.log('Search Recipe Complete')
    return res.status(200).send(res.locals.searchedRecipes)
  }
)

Router.patch('/updateSavedRecipes',
  authenticationController.verifyCookie,
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