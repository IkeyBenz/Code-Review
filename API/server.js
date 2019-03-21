const express = require('express')
    , expbhs = require('express-handlebars');

require('dotenv').config();
require('./data/database');

express()
    // View Engine Setup
    .set('views', "./API/views")
    .engine('hbs', expbhs({
        defaultLayout: 'main',
        extname: 'hbs',
        helpers: {
            'ifEquals': (val1, val2, opts) => {
                return (String(val1) == String(val2)) ? opts.fn(this) : opts.inverse(this);
            }
        }
    }))
    .set('view engine', 'hbs')
    .use(express.static('API/public'))

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

    .listen(process.env.PORT, console.log(`Running code-review API on port ${process.env.PORT}`));
