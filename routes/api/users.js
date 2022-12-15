const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    //.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .get(usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    //.get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);
    .get(usersController.getUser);

module.exports = router;