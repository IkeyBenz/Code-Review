const { CreateNewRequest, GetMyRequests, GetRequest, UpdateRequest } = require('./request.controller');
const RequestRouter = require('express').Router();

/** Every request to CRUD code-review requests require the user to be logged in. */
RequestRouter.use(require('../middleware/require-login'));

/** GET Inbox and Outbox requests for logged in user */
RequestRouter.get('/my-requests', GetMyRequests);

/** GET Specific Request. login and authorization required */
RequestRouter.get('/requests/:id', GetRequest);

/** POST New Request. */
RequestRouter.post('/requests', CreateNewRequest);

/** UPDATE Request.  */
RequestRouter.patch('/requests/:id', UpdateRequest);


module.exports = RequestRouter;
