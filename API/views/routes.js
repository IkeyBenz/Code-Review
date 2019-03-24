const router = require('express').Router();
const RequireLogin = require('../middleware/require-login');

router.get('/', (_, res) => {
  res.render('home');
});

router.get('/signin', (_, res) => {
  res.render('signin');
});

router.get('/signup', (_, res) => {
  res.render('signup');
});

router.get('/dashboard', RequireLogin, (_, res) => {
  res.render('dashboard');
});


module.exports = router;
