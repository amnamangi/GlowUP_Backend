const SellerController = require('../seller interface/seller_controller');
const express = require('express');
const router = express.Router();
const upload = require('../multer upload/multerConfig');

router.post("/createAccount", SellerController.createAccount);
router.post("/signIn", SellerController.signIn);
router.put("/:_id", SellerController.updateAccount);
router.get("/", SellerController.getAllProducts);
router.post('/products', SellerController.createProduct);
router.put('/category/:categoryId/product/:productId', SellerController.updateProductInCategory);
router.put('/updateStatus', SellerController.updateOrderStatus);
router.get('/sellers/:sellerId/orders', SellerController.fetchOrdersForSeller);

module.exports = router;