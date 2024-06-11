const AdminController = require('../admin interface/admin_controller');
const express = require('express');
const router = express.Router();

router.get("/fetchAllUsers", AdminController.fetchAllUsers);
router.get("/fetchUser/:id", AdminController.fetchUserById);
router.delete("/:id", AdminController.deleteUserById);

module.exports = router;