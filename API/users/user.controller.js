const User = require('./user.model');
const jwt = require('jsonwebtoken');


module.exports = {

    SignUp: async (req, res) => {
        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email }, 'email password name');
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (error) {
                    // Don't send them the real error because they'll go to the sign in page and try again anyway
                    console.error(error);
                    return res.json({ error: "Account with that email address already exists." });
                }
                if (matched) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    res.json({ success: `You already had an account on code-review. You're now signed in as ${req.body.email}` });
                } else {
                    res.json({ error: "Account with that email address already exists." });
                }
            });
        } else {
            const newUser = new User(req.body);
            newUser.save().then(user => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                res.json({ success: `Your account has been created and you are signed in, ${user.name}.` })
            }).catch(error => {
                console.error(error);
                res.json({ error: "Something went wrong, your account could not be created." });
            });
        }
    },

    SignIn: (req, res) => {
        User.findOne({ email: req.body.email }, 'email password name').then(user => {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    res.json({ success: `You are signed in as ${req.body.email}` });
                } else {
                    res.json({ error: "Incorrect Password." });
                }
                if (error) {
                    res.json({ error: "Something went wrong and we could not sign you in." });
                }
            });
        }).catch(error => {
            res.json({ error: "We had a problem finding your account, try signing up again." });
        });
    },

    SignOut: (req, res) => {
        res.clearCookie(process.env.COOKIE);
        res.end();
    }

}

