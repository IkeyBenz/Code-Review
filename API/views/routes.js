const router = require('express').Router();
const RequireLogin = require('../middleware/require-login');

router.get('/dashboard', RequireLogin, (req, res) => {
    res.render('home');
});

