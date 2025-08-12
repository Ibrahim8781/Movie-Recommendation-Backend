const moment = require('moment');

const Movie = require("../models/movieModel");

const getMovies = async (req, res) => {
    
    const { id } = req.params;

    try {
        if (!id) {
            const allMovies = await Movie.find({});
            return res.status(200).json(allMovies);
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(movie);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ 
            message: "Server error" 

        });
    }

}

const addMovie = async (req, res) => {

    try {
        const { 
            title, genre, releaseDate, runtime, synopsis, 
            averageRating, coverPhoto, trivia, goofs, soundtrack, 
            ageRating, parentalGuidance, boxOffice 
        } = req.body.movie;


        if (!title) {
            return res.status(400).json({
                message: "Movie title is required"
            });
        }

        const existingMovie = await Movie.findOne({ title });
        if (existingMovie) {
            return res.status(400).json({
                message: "A movie with this title already exists"
            });
        }

        const newMovie = new Movie({
            title,
            genre, 
            releaseDate,
            runtime,
            synopsis,
            averageRating: averageRating || 0, 
            coverPhoto,
            trivia: trivia || [],
            goofs: goofs || [],
            soundtrack: soundtrack || [],
            ageRating,
            parentalGuidance: parentalGuidance || "",
            boxOffice: boxOffice || {
                openingWeekend: 0,
                totalEarnings: 0,
                internationalRevenue: 0
            }
        });

        await newMovie.save();

        return res.status(201).json({
            message: "Movie added successfully!",
            movie: newMovie
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Error adding movie",
        });
    }
}

const updateMovie = async (req, res) => {
    try {

        const newMovieInfo = req.body.movie;

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { $set: newMovieInfo }, 
            { new: true } 
        );

        if (!updatedMovie) {
            return res.status(404).json({ 
                message: "Movie not found" 
            });
        }
        return res.status(200).json({ 
            message: "Movie updated successfully", 
            movie: updatedMovie 

        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ 
            message: "Error updating movie" 

        });
    }
}

const deleteMovie = async (req, res) => {

    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ 
                message: "No id provided" 
            });
        }


        const deletedAmount = await Movie.deleteOne({ _id: req.params.id});

        if (deletedAmount === 0) {
            return res.status(404).json({ 
                message: "Movie not found" 
            });
        }

        return res.status(200).json({ 
            message: "Movie deleted successfully" 
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ 
            message: "Error deleting movie" 
        });
    }
}

const updateBoxOfficeEarnings = async (req, res) => {
    try {
        const { id } = req.params;
        const { openingWeekend, totalEarnings, internationalRevenue } = req.body;

        if (!openingWeekend || !totalEarnings || !internationalRevenue) {
            return res.status(400).json({
                message: "All box office earnings fields (openingWeekend, totalEarnings, internationalRevenue) are required",
            });
        }

        if (typeof openingWeekend !== 'number' || typeof totalEarnings !== 'number' || typeof internationalRevenue !== 'number') {
            return res.status(400).json({
                message: "Earnings must be numbers",
            });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        // Update the box office earnings for the movie
        movie.boxOffice.openingWeekend = openingWeekend;
        movie.boxOffice.totalEarnings = totalEarnings;
        movie.boxOffice.internationalRevenue = internationalRevenue;

        // Save the updated movie document
        await movie.save();

        // Return a success response
        return res.status(200).json({
            message: "Box office earnings updated successfully",
            movie: {
                id: movie._id,
                title: movie.title,
                boxOffice: movie.boxOffice,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
}

const getSameMovies = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        const genre = movie.genre;

        const similarMovies = await Movie.find({ genre }).sort({ averageRating: -1 });

        return res.status(200).json({
            message: "Similar movies fetched successfully",
            movies: similarMovies,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
}

const getTopMoviesOfThisMonth = async (req, res) => {
    try {
        const now = moment();

        const startOfMonth = now.startOf('month').toDate();
        const endOfMonth = now.endOf('month').toDate();

        const topMovies = await Movie.find({
            releaseDate: {
                $gte: startOfMonth,
                $lte: endOfMonth,    
            },
        })
        .sort({ averageRating: -1 })
        .limit(10);

        return res.status(200).json({
            message: "Top rated movies of this month",
            movies: topMovies,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while fetching top movies.",
        });
    }
}

const getTop10ByGenre = async (req, res) => {
    try {
        const { genre } = req.params;

        const topMoviesByGenre = await Movie.find({ genre })
            .sort({ averageRating: -1 })
            .limit(10)
            .lean();

        return res.status(200).json(topMoviesByGenre);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


const getTopMovies = async (req, res) => {

    try {
        const top_movies = await Movie
        .find({ averageRating: { $gt: 0 }})
        .sort({ averateRating: -1 })
        .limit(10);

        return res.status(200).json(top_movies);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Server Error"});
    }

}

const filterMovies = async (req, res) => {
    try {
        const {
            title,
            genre,
            director,
            cast,
            releaseYear,
            releaseDecade,
            minRating,
            maxRating,
            ageRating,
        } = req.body;

        const query = {};

        if (title) query.title = { $regex: title, $options: "i" };
        if (genre) query.genre = { $in: genre };
        if (director) query.director = { $regex: director, $options: "i" };
        if (cast) query.cast = { $in: cast };
        if (minRating) query.averageRating = { $gte: minRating };
        if (maxRating) query.averageRating = { $lte: maxRating };
        if (releaseYear) query.releaseDate = {
            $gte: new Date(`${releaseYear}-01-01`),
            $lte: new Date(`${releaseYear}-12-31`),
        };
        if (releaseDecade) query.releaseDecade = {
            $gte: new Date(`${releaseDecade}-01-01`),
            $lt: new Date(`${releaseDecade + 10}-01-01`),
        };
        if (ageRating) query.ageRating = { $regex: ageRating, $options: "i" };

        const movies = await Movie.find(query).lean();

        return res.status(200).json(movies);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getUpcoming = async (req, res) => {
    try {
        const currentDate = new Date();

        const upcomingMovies = await Movie.find({
            releaseDate: { $gte: currentDate }
        }).sort({ releaseDate: 1 }).lean();

        return res.status(200).json(upcomingMovies);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = { 
    getMovies, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    updateBoxOfficeEarnings, 
    
    getSameMovies, 
    getTopMoviesOfThisMonth, 
    getTop10ByGenre,  
    getTopMovies,  
    filterMovies,  
    getUpcoming  
};