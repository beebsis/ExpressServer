const express = require('express');
const router = express.Router();
const itemsController = require('../../controllers/itemController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), itemsController.getAllItems)
    .delete(verifyRoles(ROLES_LIST.Admin), itemsController.deleteItem);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), itemsController.getItem);

module.exports = router;