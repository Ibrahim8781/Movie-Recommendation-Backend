const { isUserPresent } = require("../middlewares/authMiddlewares");
const User = require("../models/userModel");
const Movie = require("../models/movieModel");

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const { newName, newEmail, newFavoriteGenres } = req.body;

        if (!newName && !newEmail && !newFavoriteGenres) {
            return res.status(400).json({
                message: "At least one field (name, email, or favorite genres) is required to update",
            });
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (newName) {
            existingUser.name = newName;
        }
        if (newEmail) {
            existingUser.email = newEmail;
        }
        if (newFavoriteGenres) {
            existingUser.favoriteGenres = newFavoriteGenres;
        }

        await existingUser.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                favoriteGenres: existingUser.favoriteGenres,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
}

const recommendMovies = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user || !user.favoriteGenres || user.favoriteGenres.length === 0) {
            return res.status(404).json({ message: "User or favorite genres not found" });
        }

        const { favoriteGenres } = user;

        const recommendedMovies = await Movie.find({ genre: { $in: favoriteGenres } });

        return res.status(200).json(recommendedMovies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const getUpcomingMoviesByGenre = async (req, res) => {
    const user = req.user;

    try {
        const userProfile = await User.findById(user._id).select("favoriteGenres");

        if (!userProfile) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const movies = await Movie.find({
            genre: { $in: userProfile.favoriteGenres },
            releaseDate: { $gte: new Date() }
        })

        return res.status(200).json(movies);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
}

module.exports = { 
    updateProfile, 
    recommendMovies, 
    getUpcomingMoviesByGenre 
};