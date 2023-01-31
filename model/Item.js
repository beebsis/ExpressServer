/*
    This is how Mongoose structures it data to MongoDB
    Something I actually like quite a lot and it makes things very easy
    to understand and get into.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vareSchema = new Schema({
    fabrikant: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    typer: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ind"
    }

});

module.exports = mongoose.model('Vare', vareSchema);