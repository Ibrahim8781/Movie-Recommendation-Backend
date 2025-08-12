const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
    {
        referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
        awardName: { type: String, required: true }, 
        category: { type: String },
        year: { type: Number },
        won: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Award', awardSchema);