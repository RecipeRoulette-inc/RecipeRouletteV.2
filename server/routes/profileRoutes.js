const express = require('express'); 
const Router = express.Router();
const profileController = require('../controllers/profileController');

Router
  .route('/userInfo')
  .get(profileController.getUserId, profileController.getUserInfo, (req, res) => {

    res.status(200).send(res.locals.userInfo);
    
  })

module.exports = Router