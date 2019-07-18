const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    rating: {
        type: Number,
        required: true,
    },

    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviewer',
        required: true,
    },

    review: {
        type: String,
        required: true,
        maxlength: 140,
    },

    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true,
    },

    createdAt: {
        //TODO: what the hell and fuck is a mongoose timestamp feature?
        //TODO: createdAt, updatedAt
    },

});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
