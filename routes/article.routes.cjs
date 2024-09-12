const express = require('express');

const articleController = require('../controllers/article.controller.cjs');

const router = express.Router();

router.get('/best', articleController.getArticles);
router.get('/content/:category', articleController.getContent);
router.get('/content/:category/:idx', articleController.getContentDetails);
router.patch('/content/category', articleController.updateContent);

module.exports = router;

