const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email can\'t be blank'],
        unique: true,
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'email is invalid'], 
        index: true
    },
    password: {
        type: 'String',
        required: true
    }
});

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

UserSchema.methods.toAuthJson = function() {
    return {
        _id: this._id,
        email: this.email
    }
}

module.exports = mongoose.model('User', UserSchema);