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
        require: true,
    },
    refreshToken: String
});

module.exports = mongoose.model('Users', userSchema);