const { SignUp, SignIn, SignOut } = require('./user.controller');

const UserRouter = require('express').Router();


UserRouter.post('/signup', SignUp);

UserRouter.post('/signin', SignIn);

UserRouter.get('/signout', SignOut);


module.exports = UserRouter;