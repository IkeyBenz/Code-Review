const Request = require('./request.model');
const User = require('../users/user.model');

module.exports = {

    GetMyRequests: async (req, res) => {
        console.log("Got here");
        const user = await req.user.populate('outbox');
        res.json(user);
    },

    CreateNewRequest: async (req, res) => {
        const answerer = await User.findOne({ email: req.body.answerer });

        req.body.asker = req.user;
        req.body.answerer = answerer;

        const newRequest = new Request(req.body);

        answerer.inbox.unshift(newRequest);
        await answerer.save();

        req.user.outbox.unshift(newRequest);
        await req.user.save();

        newRequest.save().then(request => {
            res.json({ success: "We've sent your request for code review." });
        }).catch(error => {
            console.error(error);
            res.json({ error: "Something went wrong, we couldn't process your request." });
        });
    },

    GetRequest: (req, res) => {
        Request.findById(req.params.id).then(request => {
            res.json(request);
        }).catch(console.error)
    }

}