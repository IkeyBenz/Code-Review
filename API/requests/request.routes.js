const express = require('express');

const RequireLogin = require('../middleware/require-login');

const RequestRouter = express.Router();
const {
  CreateNewRequest, GetMyRequests, GetRequest, UpdateRequest,
} = require('./request.controller');


/** GET Inbox and Outbox requests for logged in user */
RequestRouter.get('/my-requests', RequireLogin, GetMyRequests);

/** GET Specific Request. login and authorization required */
RequestRouter.get('/requests/:id', RequireLogin, GetRequest);

/** POST New Request. */
RequestRouter.post('/requests', RequireLogin, CreateNewRequest);

/** UPDATE Request.  */
RequestRouter.patch('/requests/:id', RequireLogin, UpdateRequest);


module.exports = RequestRouter;
