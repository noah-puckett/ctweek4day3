const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    age: {
        type: Number,
    },

    weight: {
        type: String,
    },

    //ref: needs to be called ref so the DB 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
