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

// All Route Folders
const userRoutes = require('./routes/userRoutes')
const recipeRouter = require('./routes/recipeRouter')


app.use(express.json());

// Currently acting as a catch all SWITCHED to GET from USE
app.get('/', (req, res)=>{
    return res.sendFile(path.join((__dirname), '../index.html'))
})

// Redirect to Route Folders
app.use('/user', userRoutes)

app.use('/recipe', recipeRouter)

// Catch-All Route Handler


// Global Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, ()=> {
    console.log(`...listening on port ${PORT}`)
})

module.exports = app;
