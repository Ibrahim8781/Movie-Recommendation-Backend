const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [ "user", "admin" ],
            default: "user",
        },
        favoriteGenres: [{ 
            type: String 
        }],
    },
    { timestamps: true },
);

userSchema.methods.comparePassword = async function (sentPassword) {
    return this.password === sentPassword;
};

module.exports = mongoose.model("User", userSchema);