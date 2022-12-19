const express = require('express');
const router = express.Router();
const itemsController = require('../../controllers/itemsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(itemsController.getAllItems)
    .post(itemsController.handleNewItem)
    .put(itemsController.updateItem)
    .delete(itemsController.deleteItem)

    // Currently having issues with verifying roles for some reason, haven't looked into it
    // It's currently lower on my priority list.
    /*
    .get(verifyRoles(ROLES_LIST.Admin), itemsController.getAllItems)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), itemsController.createNewItem)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), itemsController.updateItem)
    .delete(verifyRoles(ROLES_LIST.Admin), itemsController.deleteItem)
    */



router.route('/:id')
    .get(itemsController.getItem);

module.exports = router;