const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Mixed,
        required: true
    },
    fragment: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;