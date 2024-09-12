const express = require('express');

const categoryController = require('../controllers/category.controller.cjs');

const router = express.Router();

router.get('/:category', categoryController.getCategory);
router.get('/:category/:idx', categoryController.getArticle);

module.exports = router;
