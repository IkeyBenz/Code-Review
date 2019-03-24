const UserRouter = require('express').Router();
const { SignUp, SignIn, SignOut } = require('./user.controller');


UserRouter.post('/signup', SignUp);

UserRouter.post('/signin', SignIn);

UserRouter.get('/signout', SignOut);


module.exports = UserRouter;
