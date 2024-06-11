const UserController = require('../user interface/user_controller');
const express = require('express');
const router = express.Router();

router.put("/:_id", UserController.updateAccount);
router.get("/", UserController.fetchAllCategories);
router.get("/:id", UserController.fetchCategoryById);
router.get("/", UserController.fetchAllProducts);
router.get("/category/:id", UserController.fetchProductsByCategory);
router.post('/createOrder', UserController.createOrder);
router.get('/:user', UserController.getCartForUser);
router.post('/', UserController.addToCart);
router.delete('/', UserController.removeFromCart);
router.post('/appointment', UserController.createAppointment);
router.get('/showAppointment', UserController.getAppointments);

module.exports = router;