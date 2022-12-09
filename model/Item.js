/*
    This is how Mongoose structures it data to MongoDB
    Something I actually like quite a lot and it makes things very easy
    to understand and get into.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "In-Stock"
    }

});

module.exports = mongoose.model('Item', itemSchema);