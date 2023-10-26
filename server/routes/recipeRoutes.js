const express = require('express');
const Router = express.Router();

const recipeController = require('../controllers/recipeController');
const authenticationController = require('../controllers/authenticationController');
const saveRecipesController = require('../controllers/saveRecipesController');
const uploadRecipeController = require('../controllers/uploadRecipeController');

// saved recipes
Router.
  route('/getSavedRecipes')
  .get(saveRecipesController.getSavedRecipes,
    (req, res) => {
      return res.status(200).json(res.locals.savedRecipes);
    });

Router.
  route('/addSavedRecipes')
  .post(saveRecipesController.addSavedRecipes,
    (req, res) => {
      return res.status(200).json(res.locals.addRecipe);
    });

Router.
  route('/deleteSavedRecipes')
  .delete(saveRecipesController.deleteSavedRecipes,
    (req, res) => {
      return res.status(200).send('Success: Deleted Recipe');
    });
// saved recipes above



// add your own recipe
Router.
  route('/uploadRecipe')
  .post(uploadRecipeController.uploadRecipe,
    (req, res) => {
      return res.status(200).json(res.locals.uploadedRecipes);
    });
// add your own recipe above

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