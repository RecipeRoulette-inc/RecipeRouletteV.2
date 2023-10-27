const express = require('express');
const Router = express.Router();

const recipeController = require('../controllers/recipeController');

Router
  .route('/randomRecipe')
  .get(recipeController.getRandomRecipe,
    (req, res) => {
      return res.status(200).send(res.locals.randomRecipe)
    });

Router
  .route('/getRecipeInformationBulk')
  .get(recipeController.getRecipeInformationBulk,
    (req, res) => {
      return res.status(200).send(res.locals.bulkRecipeInformation)
    });

Router
  .route('/getRecipeInformationBulk/:id')
  .get(recipeController.getRecipeInformationBulk,
    (req, res) => {
      return res.status(200).json(res.locals.getRecipeInfo)
    });

Router
  .route('/searchRecipes')
  .post(recipeController.searchRecipes,
    (req, res) => {
      return res.status(200).json(res.locals.recipes)
    });

Router
  .route('/nutritionLabel/:recipeId')
  .get(recipeController.getRecipeNutritionLabel,
    (req, res) => {
      return res.status(200).send(res.locals.nutritionLabel)
    });

Router.route('/searchByIngredients')
  .patch(recipeController.searchByIngredient,
    (req, res) => {
      return res.status(200).send(res.locals.searchResults)
    });


module.exports = Router; 