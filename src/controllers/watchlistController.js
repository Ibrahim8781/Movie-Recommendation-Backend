const Watchlist = require("../models/watchlistModel");

const createWatchlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, movies } = req.body;

        const existingWatchlist = await Watchlist.findOne({ userId, name });
        if (existingWatchlist) {
            return res.status(400).json({
                message: "Watchlist with this name already exists for this user.",
            });
        }

        const newWatchlist = new Watchlist({ userId, name, movies });
        await newWatchlist.save();

        return res.status(201).json({
            message: "Watchlist created successfully",
            watchlist: newWatchlist,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const readWatchlist = async (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.user._id;

        const watchlist = await Watchlist.findOne({ userId, name }).populate("movies", "title");
        if (!watchlist) {
            return res.status(404).json({
                message: "Watchlist not found for this user.",
            });
        }

        return res.status(200).json({
            message: "Watchlist retrieved successfully",
            movies: watchlist.movies,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const updateWatchlist = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, movies } = req.body;
        const userId = req.user._id;

        const updatedWatchlist = await Watchlist.findOneAndUpdate(
            { userId, name },
            { name: newName, movies },
            { new: true }
        );

        if (!updatedWatchlist) {
            return res.status(404).json({
                message: "Watchlist not found.",
            });
        }

        return res.status(200).json({
            message: "Watchlist updated successfully",
            watchlist: updatedWatchlist,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const deleteWatchlist = async (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.user._id;

        const deletedWatchlist = await Watchlist.findOneAndDelete({ userId, name });
        if (!deletedWatchlist) {
            return res.status(404).json({
                message: "Watchlist not found.",
            });
        }

        return res.status(200).json({
            message: "Watchlist deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const addMovieToWatchlist = async (req, res) => {
    try {
        const { name } = req.params;
        const { movieId } = req.body;
        const userId = req.user._id;

        const watchlist = await Watchlist.findOne({ userId, name });
        if (!watchlist) {
            return res.status(404).json({
                message: "Watchlist not found.",
            });
        }

        if (watchlist.movies.includes(movieId)) {
            return res.status(400).json({
                message: "Movie already added to the watchlist.",
            });
        }

        watchlist.movies.push(movieId);
        await watchlist.save();

        return res.status(200).json({
            message: "Movie added to watchlist successfully",
            watchlist,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const removeMovieFromWatchlist = async (req, res) => {
    try {
        const { name } = req.params;
        const { movieId } = req.body;
        const userId = req.user._id; 

        const watchlist = await Watchlist.findOne({ userId, name });
        if (!watchlist) {
            return res.status(404).json({
                message: "Watchlist not found.",
            });
        }

        const movieIndex = watchlist.movies.indexOf(movieId);
        if (movieIndex === -1) {
            return res.status(400).json({
                message: "Movie not found in the watchlist.",
            });
        }

        watchlist.movies.splice(movieIndex, 1);
        await watchlist.save();

        return res.status(200).json({
            message: "Movie removed from watchlist successfully",
            watchlist,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    createWatchlist, 
    readWatchlist, 
    updateWatchlist, 
    deleteWatchlist, 
    addMovieToWatchlist, 
    removeMovieFromWatchlist, 
}