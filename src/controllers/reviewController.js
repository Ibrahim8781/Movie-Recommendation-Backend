const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");

const addReview = async (req, res) => {
    const { movieId } = req.params;
    const { rating, reviewText } = req.body;
    const user = req.user; 

    try {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ 
                message: "Rating must be between 1 and 5." 
            });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ 
                message: "Movie not found." 
            });
        }

        let review = await Review.findOne({ movieId, userId: user._id });
        review = new Review({
            movieId,
            userId: user._id,
            rating,
            reviewText
        });

        await review.save();

        const reviews = await Review.find({ movieId });

        if (reviews.length > 0) {
            const totalRatings = reviews.reduce((sum, review) => sum += review.rating, 0);
            const averageRating = totalRatings / reviews.length;
            
            movie.averageRating = averageRating;
            await movie.save();
        }

        res.status(201).json({ 
            message: 'Review added successfully.', 
            review 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            message: "Server error" 
        });
    }
}

const deleteReview = async (req, res) => {
    const user = req.user; 
    const { movieId } = req.params;

    try {
        const review = await Review.findOne({ movieId, userId: user._id });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await Review.findByIdAndDelete(review._id);

        const reviews = await Review.find({ movieId });

        if (reviews.length > 0) {
            const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRatings / reviews.length;

            const movie = await Movie.findById(movieId);
            if (movie) {
                movie.averageRating = averageRating;
                await movie.save();
            }
        }

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getUserReviews = async (req, res) => {
    
    const user = req.user;

    try {
        const userReview = await Review.find({ userId: user._id });

        res.status(200).json(userReview);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Server Error"});
    }
}

const getMovieReviews = async (req, res) => {
    const { movieId } = req.body;

    try {
        const movieReviews = await Review.find({ movieId });

        res.status(200).json(movieReviews);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Server Error"});
    }
}

module.exports = { 
    addReview, 
    deleteReview, 
    getUserReviews, 
    getMovieReviews 
};
