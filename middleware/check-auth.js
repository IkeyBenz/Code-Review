const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

module.exports = (req, res, next) => {

    if (req.cookies && req.cookies[process.env.COOKIE]) {
        const uid = jwt.decode(req.cookies[process.env.COOKIE])._id;
        User.findById(uid).then(user => {
            req.user = user;
            console.log(req.user);
            next();
        });
    } else {
        next();
    }

}