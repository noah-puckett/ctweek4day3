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

}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
