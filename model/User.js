/*
    This is how Mongoose structures it data to MongoDB
    Something I actually like quite a lot and it makes things very easy
    to understand and get into.

    Here we give users(not employees) their username, roles and password.
    By default, the role is "user: 50".
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 50
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    fornavn: {
        type: String
    },

    

    refreshToken: String,
});

module.exports = mongoose.model('Users', userSchema);
