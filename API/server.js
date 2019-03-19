const express = require('express')
    , expbhs = require('express-handlebars');

require('./data/database');
require('dotenv').config();

express()
    // View Engine Setup
    .engine('hbs', expbhs({ defaultLayout: 'main', extname: 'hbs' }))
    .set('view engine', 'hbs')
    .use(express.static('public'))

    // Form Middlewares
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(require('method-override')('_method'))

    // Cookies & Authentication Middleware
    .use(require('cookie-parser')())
    .use(require('./middleware/check-auth'))

    // API Endpoints
    .use(require('./requests/request.routes'))
    .use(require('./users/user.routes'))

    // Page routes
    .use(require('./views/routes'))

    .listen(process.env.PORT, console.log("Running code-review API on port 5000"));
