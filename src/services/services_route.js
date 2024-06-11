const express = require('express');
const router = express.Router();
const ServiceController = require('../services/service_provider_controller');

router.post('/add', ServiceController.addService);
router.get('/fetch', ServiceController.fetchServices);
router.post("/createAccount", ServiceController.createAccount);
router.post("/signIn", ServiceController.signIn);

module.exports = router;
