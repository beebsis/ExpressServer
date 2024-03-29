const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');

router.post('/', itemController.handleNewItem);

module.exports = router;