const express = require("express");
const router = express.Router();

const {
    updateProfile,
    recommendMovies,
    getUpcomingMoviesByGenre,
} = require("../controllers/userController");

const { isUserPresent } = require("../middlewares/authMiddlewares");

router.use(isUserPresent);

router.put("/", updateProfile);
router.get("/recommended-movies", recommendMovies);
router.get("/upcoming-by-genre", getUpcomingMoviesByGenre);

module.exports = router;