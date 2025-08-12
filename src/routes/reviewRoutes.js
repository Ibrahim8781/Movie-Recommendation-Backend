const express = require('express');
const router = express.Router();

const {
    addReview,
    getUserReviews,
    getMovieReviews,
    deleteReview,
} = require('../controllers/reviewController');

const { isUserPresent } = require('../middlewares/authMiddlewares');

router.use(isUserPresent);

router.post('/:movieId', addReview);
router.delete("/:movieId", deleteReview);
router.get('/user/', getUserReviews);
router.get('/movie/:movieId', getMovieReviews);

module.exports = router;