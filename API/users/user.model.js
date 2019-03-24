const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  inbox: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  outbox: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  history: [{ type: Schema.Types.ObjectId, ref: 'Request' }],

}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) { return next(); }

  return bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (error, hash) => {
      this.password = hash;
      return next();
    });
  });
});


UserSchema.pre('findOne', function (next) {
  this.populate({ path: 'inbox', populate: { path: 'asker', select: 'name' } });
  this.populate({ path: 'outbox', populate: { path: 'answerer', select: 'name' } });
  this.populate('history');
  next();
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, done);
};


module.exports = mongoose.model('User', UserSchema);
