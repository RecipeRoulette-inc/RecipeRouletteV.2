require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const pool = require('pg');
const cookieParser = require('cookie-parser');

//i want to download morgan dependency to see our HTTP request logger middleware for node.js in the terminal
app.use(morgan('tiny'));
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(cookieParser());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// All Route Folders
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const profileRoutes = require('./routes/profileRoutes');

// serve the icon
app.use('/favicon.ico', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/src/public', 'favicon.ico'));
});

// Currently acting as a catch all SWITCHED to GET from USE - OLD CODE 
// OLD CODE - 
app.get('/', (req, res) => {
  return res.sendFile(path.join((__dirname), '../index.html'))
});


// Redirect to Route Folders
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);
app.use('/recipes', recipeRoutes);

// Catch-All Route Handler
app.use((req, res) => res.sendStatus(404));

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

app.listen(PORT, () => {
  console.log(`...Listening on port ${PORT}`)
})

module.exports = app;
