const Request = require('./request.model');
const User = require('../users/user.model');

module.exports = {

    GetMyRequests: async (req, res) => {
        const user = await req.user.populate('outbox');
        res.json(user);
    },

    CreateNewRequest: async (req, res) => {
        console.log(req.body);
        let answerer;
        try {
            answerer = await User.findOne({ email: req.body.answerer });
            console.log(answerer);
        } catch (error) {
            // If there is no user, send an email to `email` explaining that they should sign
            // up for code-review in order to respond to this request for code-review.
            console.log(error);
        }

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

    GetRequest: async (req, res) => {

        try {
            const request = await Request.findOne({ _id: req.params.id });
            // User needs to be authorized to view this request
            if (String(request.asker._id) == String(req.user._id) || String(request.answerer._id) == String(req.user._id)) {
                if (request.status != "Opened") {
                    request.status = "Opened";
                    request.date_opened = Date.now();
                    await request.save();
                }

                if (req.is("application/json")) {
                    res.json(request);
                } else {
                    res.render("request-show", { request });
                }

            } else {
                if (req.is("application/json")) {
                    res.json({ error: "You do not have authorization to view this request." });
                } else {
                    res.redirect("/dashboard?error=You do not have authorization to view this request.");
                }
            }

        } catch (e) {
            if (req.is("application/json")) {
                res.json({ error: e.message });
            } else {
                res.redirect(`/dashboard?error=${e.message}`);
            }
        }

    },

    UpdateRequest: async (req, res) => {
        console.log('Hey bruh we here')
        try {
            const request = await Request.findOne({ _id: req.params.id });

            // If req.user is authorized to edit this request
            if (String(request.asker._id) == String(req.user._id) || String(request.answerer._id) == String(req.user._id)) {

                // Apply updates:
                await Request.findOneAndUpdate({ _id: req.params.id }, req.body);

                // If the update contains a response from the answerer, mark the status of this request 'reviewed'
                if (req.body.cr_response) {
                    request.status = 'reviewed';
                    request.date_responded = Date.now();
                    await request.save();
                }
                // If the update contains an edited request from the asker, update the date_request_updated property
                if (req.body.cr_request) {
                    request.date_request_updated = Date.now();
                    await request.save();
                }

                if (req.is("application/json")) {
                    res.json({ success: "Request successfully updated." });
                } else {
                    res.redirect(`/requests/${req.params.id}?success=Request successfully updated.`);
                }

            } else {
                if (req.is("application/json")) {
                    res.json({ error: "You do not have authorization to edit this request." });
                } else {
                    res.redirect("/dashboard?error=You do not have authorization to edit that request.");
                }
            }


        } catch (e) {

            if (req.is("application/json")) {
                res.json({ error: e.message });
            } else {
                res.redirect(`/requests/${req.params.id}?error=${e.message}`);
            }

        }

    }

}