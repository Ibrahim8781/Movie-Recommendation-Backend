const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        genre: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,  
            required: true,
        },
        runtime: {
            type: Number,  
            required: true,
        },
        synopsis: {
            type: String,  
            required: true,
        },
        averageRating: {
            type: Number, 
            default: 0,  
            min: 0,  
            max: 5, 
        },
        coverPhoto: {
            type: String,
            required: false,
        },
        trivia: {
            type: [String], 
            required: false,
        },
        goofs: {
            type: [String], 
            required: false,
        },
        soundtrack: {
            type: [String], 
            required: false,
        },
        ageRating: {
            type: String,
            required: true,
        },
        parentalGuidance: {
            type: String, 
            required: false,
        },
        boxOffice: {
            openingWeekend: {
              type: Number,
              required: false
            },
            totalEarnings: {
              type: Number,
              required: false
            },
            internationalRevenue: {
              type: Number,
              required: false
            }
          },
        searchCount: {
            type: Number, 
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
