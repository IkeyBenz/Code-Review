const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    inbox: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
    outbox: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
    history: [{ type: Schema.Types.ObjectId, ref: 'Request' }]

}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
            this.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, done);
}

UserSchema.pre("findOne", function (next) {
    this.populate("inbox");
    this.populate("outbox");
    this.populate("history");
    next();
});

module.exports = mongoose.model('User', UserSchema);