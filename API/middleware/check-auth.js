const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

module.exports = (req, res, next) => {
  if (req.cookies && req.cookies[process.env.COOKIE]) {
    const uid = jwt.decode(req.cookies[process.env.COOKIE])._id;
    User.findOne({ _id: uid }).then((user) => {
      req.user = user;
      res.locals.authenticatedUser = user;
      next();
    });
  } else {
    next();
  }
};
