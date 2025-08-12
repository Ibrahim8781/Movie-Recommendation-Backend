const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        name: { 
            type: String, 
            required: true,
        },
        movies: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Movie' 
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Watchlist', watchlistSchema);