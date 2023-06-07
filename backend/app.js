//initializing Express application

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// backend/app.js
// ...
const { ValidationError } = require('sequelize');

// ...

const { environment } = require('./config');
const isProduction = environment === 'production';
// backend/app.js
const routes = require('./routes');

//Initialize the Express application:
const app = express();
//Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

//middleware for parsing JSON bodies of requests with Content-Type of "application/json".
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );





// ...

app.use(routes); // Connect all the routes


// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});


/*
The second error handler is for catching Sequelize errors and formatting them before sending the error response.
*/
// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});


// backend/app.js
/*
The last error handler is for formatting all the errors before returning a JSON response. It will include the error message, the error messages as a JSON object with key-value pairs, and the error stack trace (if the environment is in development) with the status code of the error message.


*/
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


// backend/app.js
// ...

module.exports = app;
