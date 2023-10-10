const express = require('express')
const Router = express.Router()

Router.post('/searchRecipe', (req,res) => {
    return res.status(200)
})

module.exports = Router;