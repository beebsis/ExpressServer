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
        PC: {
            type: String,
            default: 4462
        },
        Mouse: Number,
        Keyboard: Number,
        Screen: Number
    },
    serial: {
        type: String,
        required: true
    },
    status: {
        ind: {
            type: String,
            default: 243
        },
        ud: Number,
        reserveret: Number
    }

});

module.exports = mongoose.model('Vare', vareSchema);