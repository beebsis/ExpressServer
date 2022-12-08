/*
    This is how Mongoose structures it data to MongoDB
    Something I actually like quite a lot and it makes things very easy
    to understand and get into.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);