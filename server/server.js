const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const {DB_URI} = process.env;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('connected to database')
})
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use('/', (req, res)=>{
    return res.sendFile(path.join((__dirname), '../index.html'))
})



app.listen(PORT, ()=> {
    console.log(`...listening on port ${PORT}`)
})

module.exports = app;
