const express = require('express')
    , expbhs = require('express-handlebars');

require('./data/database');
require('dotenv').config();

express()
    .engine('hbs', expbhs({ defaultLayout: 'main', extname: 'hbs' }))
    .set('view engine', 'hbs')
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(require('cookie-parser')())
    .use(require('./middleware/check-auth'))

    .use(require('./requests/request.routes'))
    .use(require('./users/user.routes'))

    .listen(process.env.PORT, console.log("Running code-review API on port 5000"));
