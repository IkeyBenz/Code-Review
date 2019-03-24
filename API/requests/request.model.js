const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequestSchema = new Schema({

  asker: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user that send the code-review request
  answerer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The recipient of the request for code-review
  subject: { type: String, required: true }, // The subject of the code review request
  language: { type: String, required: true }, // The language that the code is written in
  cr_request: { type: String, required: true }, // The code chunk that came with the request
  cr_response: { type: String, default: '' }, // The code chunk that the reviewer sends back
  date_requested: { type: Date, default: Date.now() }, // The date that the request was created
  date_responded: { type: Date, default: null }, // The date that the request was answered
  date_opened: { type: Date, default: null }, // The date that the request was opened
  status: { type: String, default: 'Unopened' }, // Unopened || Opened || Answered
  date_request_updated: { type: Date, default: Date.now() },

});

RequestSchema.pre('findOne', function (next) {
  this.populate({ path: 'answerer', name: 'name' });
  this.populate({ path: 'asker', name: 'name' });
  next();
});

module.exports = mongoose.model('Request', RequestSchema);
