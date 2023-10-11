const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController')


Router.get('/randomRecipe', 
  recipeController.getRandomRecipe, 
  (req, res) => {
    console.log('PRE SEND BACK YOOOOOO')
    return res.status(200).send(res.locals.randomRecipe)
  })

Router.get('/searchRecipe',
authenticationController.verifyCookie,
  (req,res) => {
    console.log('cookieCheck passed')
    return res.status(200)
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



module.exports = Router; 