const express = require('express');

require('./data/database');
require('dotenv').config();

express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(require('cookie-parser')())
    .use(require('./middleware/check-auth'))

    .use(require('./requests/request.routes'))
    .use(require('./users/user.routes'))

    .listen(process.env.PORT, console.log("Running code-review API on port 5000"));
