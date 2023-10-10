const express = require('express'); 
const recipeController = require('../controllers/recipeController')

const Router = express.Router();

Router
  .route('/')
  .get(recipeController.getRandomRecipe, (req, res) => {
    console.log('recipecontroller get route')
    res.send('Message received')
  })

module.exports = Router; 