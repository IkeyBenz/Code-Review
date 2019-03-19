const User = require('./user.model');
const jwt = require('jsonwebtoken');


module.exports = {

    SignUp: async (req, res) => {
        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email }, 'email password name');
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (error) {
                    if (req.is("application/json")) {
                        return res.json({ error: "Account with that email address already exists." });
                    } else {
                        return res.redirect("/signup?error=An account with that email address already exists.");
                    }
                }
                if (matched) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    if (req.is("application/json")) {
                        res.json({ success: `You already had an account on code-review. You're now signed in as ${req.body.email}` });
                    } else {
                        res.redirect(`/dashboard?success=You already had an account on code-review. You're now signed in as ${req.body.email}`);
                    }
                } else {
                    if (req.is("application/json")) {
                        res.json({ error: "An account with that email address already exists." });
                    } else {
                        res.redirect("/signup?error=An account with that email address already exists.")
                    }
                }
            });
        } else {
            const newUser = new User(req.body);
            newUser.save().then(user => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                if (req.is("application/json")) {
                    res.json({ success: `Your account has been created and you are signed in, ${user.name}.` })
                } else {
                    res.redirect(`/signup?successYour account has been created and you are signed in, ${user.name}.`);
                }
            }).catch(error => {
                if (req.is("application/json")) {
                    res.json({ error: "Something went wrong, your account could not be created." });
                } else {
                    res.redirect("/signup?error=Something went wrong, your account could not be created.");
                }
            });
        }
    },

    SignIn: (req, res) => {
        User.findOne({ email: req.body.email }, 'email password name').then(user => {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
                    if (req.is("application/json")) {
                        res.json({ success: `You are signed in as ${req.body.email}` });
                    } else {
                        res.redirect(`/dashboard?success=You are signed in as ${req.body.email}`);
                    }
                } else {
                    if (req.is("application/json")) {
                        res.json({ error: "Incorrect Password." });
                    } else {
                        res.redirect("/signin?error=Incorrect Password.");
                    }
                }
                if (error) {
                    if (req.is("application/json")) {
                        res.json({ error: "Something went wrong and we could not sign you in." });
                    } else {
                        res.redirect("/signin?error=Something went wrong and we could not sign you in.");
                    }
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

