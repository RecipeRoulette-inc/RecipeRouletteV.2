const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT

app.use('/', (req, res)=>{
    return res.sendFile(path.join((__dirname), '../index.html'))
})



app.listen(PORT, ()=> {
    console.log(`...listening on port ${PORT}`)
})

module.exports = app;
