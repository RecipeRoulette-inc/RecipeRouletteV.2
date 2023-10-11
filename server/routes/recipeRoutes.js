const express = require('express'); 
const Router = express.Router();

const recipeController = require('../controllers/recipeController')
const authenticationController = require('../controllers/authenticationController')


Router.get('/randomRecipe', 
  recipeController.getRandomRecipe, 
  (req, res) => {
    console.log('recipecontroller get route')
    res.send('Message received')
  })

Router.get('/searchRecipe',
authenticationController.verifyCookie,
  (req,res) => {
    console.log('cookieCheck passed')
    return res.status(200)
  }
)



module.exports = Router; 