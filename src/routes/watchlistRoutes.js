const express = require('express');
const router = express.Router();

const {
    createWatchlist,
    readWatchlist,
    updateWatchlist,
    deleteWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
} = require('../controllers/watchlistController');
const { isUserPresent } = require('../middlewares/authMiddlewares');

router.use(isUserPresent);

router.post('/', createWatchlist);
router.get('/:name', readWatchlist);
router.put('/:name', updateWatchlist);
router.delete('/:name', deleteWatchlist);
router.post('/:name/add', addMovieToWatchlist);
router.post('/:name/remove', removeMovieFromWatchlist);

module.exports = router;