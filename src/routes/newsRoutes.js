const express = require('express');
const router = express.Router();

const {
    createNewsArticle,
    readNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
} = require('../controllers/newsController');

const { isUserPresent, isAdmin } = require('../middlewares/authMiddlewares');

router.use(isUserPresent);
router.use(isAdmin)

router.post('/', createNewsArticle);
router.get('/:id', readNewsArticle);
router.put('/:id', updateNewsArticle);
router.delete('/:id', deleteNewsArticle);

module.exports = router;