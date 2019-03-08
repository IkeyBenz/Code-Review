const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../users/user.model');

const RequestSchema = new Schema({

    asker: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user that send the code-review request
    answerer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The recipient of the request for code-review
    cr_request: { type: String, required: true },                       // The code chunk that came with the request
    cr_response: { type: String, default: "" },                         // The code chunk that the reviewer sends back
    date_requested: { type: Date, default: Date.now() },                // The date that the request was created
    date_responded: { type: Date, default: null },                      // The date that the request was answered
    opened: { type: Boolean, default: false }                           // Whether or not the recipient has opened the request

});

RequestSchema.pre("findOne", function (next) {
    this.populate("answerer");
    this.populate("asker");
    next();
});

module.exports = mongoose.model('Request', RequestSchema);