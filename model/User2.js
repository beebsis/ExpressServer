const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    fornavn: {
        type: String
    },
    efternavn: {
        type: String
    },
    password: {
        type: String
    },
    uniId: {
        type: String
    },
    stamklasse: {
        type: String
    },
    cprNr: {
        type: Number
    },
    adresse: {
        type: String
    },
    zip: {
        type: Number
    },
    by: {
        type: String
    },
    email: {
        type: String
    },
    tlfNr: {
        type: Number
    }
});

module.exports = mongoose.model('Users'. userSchema);