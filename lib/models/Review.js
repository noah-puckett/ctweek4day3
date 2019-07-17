const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    rating: {
        type: Number,
        required: true,
    },

    reviewer: {
        //TODO: reference to reviewer goes here
        required: true,
    },

    review: {
        type: String,
        required: true,
        maxlength: 140,
    },

    film: {
        //TODO: reference id for film
        required: true,
    },

    createdAt: {
        //TODO: what the hell and fuck is a mongoose timestamp feature?
        //TODO: createdAt, updatedAt
    },

});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
