const express = require('express');
const router = express.Router();

const {
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
    getUpcoming,
} = require('../controllers/movieController');

const { isUserPresent, isAdmin } = require('../middlewares/authMiddlewares');

router.use(isUserPresent);

router.get('/similar/:id', getSameMovies);
router.get('/top-month', getTopMoviesOfThisMonth);
router.get('/top-genre/:genre', getTop10ByGenre);
router.get('/top', getTopMovies);
router.post('/filter', filterMovies);
router.get('/upcoming', getUpcoming);

router.get('/:id?', isAdmin, getMovies);
router.post('/', isAdmin, addMovie);
router.put('/:id', isAdmin, updateMovie);
router.delete('/:id', isAdmin, deleteMovie);
router.put('/boxOffice/:id', isAdmin, updateBoxOfficeEarnings);

module.exports = router;