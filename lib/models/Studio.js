const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    address: {

        city: {
            type: String,
        },

        state: {
            type: String,
        },

        country: {
            type: String,
        },
    }

});

const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;
