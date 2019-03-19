const mongoose = require('mongoose');
const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/code-review';

const Production_DB = "mongodb://heroku_wdpzsztg:prf9c9m8ucrgj119fv4d7f3cq4@ds155815.mlab.com:55815/heroku_wdpzsztg"

assert = require('assert');

// Allows every mongoose function to be treated as if they return a promise
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(DBURL, { useNewUrlParser: true }, (err, db) => {
    assert.equal(err, null);
    console.log('Successfully Connected to the Local Database.');
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
mongoose.set('debug', false);

module.exports = mongoose.connection;