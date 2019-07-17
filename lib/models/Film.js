const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    studio: {
        //TODO: reference ID goes here
        required: true,
    },

    released: {
        type: Number,
        required: true,
    },

    cast: [{
        role: {
            type: String,
        },

        actor: {
            //TODO: reference ID goes here
        },
    }],

});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
