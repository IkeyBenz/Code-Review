const router = require('express').Router();
const RequireLogin = require('../middleware/require-login');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/dashboard', RequireLogin, (req, res) => {
  res.render('dashboard');
});


module.exports = router;
