const express = require('express'); 
const recipeController = require('../controllers/recipeController')

const Router = express.Router();

Router
  .route('/')
  .get((req, res) => {

  })

module.exports = Router; 