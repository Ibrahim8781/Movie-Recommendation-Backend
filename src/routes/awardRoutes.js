const express = require('express');
const router = express.Router();

const {
    createAward,
    readAward,
    updateAward,
    deleteAward,
} = require('../controllers/awardController');

const { isAdmin, isUserPresent } = require('../middlewares/authMiddlewares');

router.use(isUserPresent);
router.use(isAdmin);

router.post('/', createAward);
router.get('/:id', readAward);
router.put('/:id', updateAward);
router.delete('/:id', deleteAward);

module.exports = router;