const { CreateNewRequest, GetMyRequests, GetRequest } = require('./request.controller');
const RequireLogin = require('../middleware/require-login');
const RequestRouter = require('express').Router();

// GET Inbox and Outbox requests for logged in user
RequestRouter.get('/my-requests', RequireLogin, GetMyRequests);

RequestRouter.get('/requests/:id', GetRequest);

// POST new request
RequestRouter.post('/requests', RequireLogin, CreateNewRequest);

module.exports = RequestRouter;
