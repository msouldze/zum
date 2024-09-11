const express = require('express');

const bestController = require('../controllers/best.controller.cjs');

const router = express.Router();

router.get('/', bestController.getHome);

module.exports = router;
