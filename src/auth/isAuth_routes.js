const express = require('express');
const router = express.Router();
const AuthController = require("../auth/isAuth_controller")
const ProfileController = require("../auth/uploadProfile")

// const isAuth = require('../middleware/isAuth');

router.post("/signup", AuthController.createAccount);
router.post("/uploadProfile", ProfileController.uploadProfile);
//router.post('/users/:userId/uploadProfilePicture', AuthController.uploadProfilePicture);
//router.post("/update-pfp", AuthController.updatePfp);
router.post("/signin", AuthController.signIn);
//router.post("/forgotPassword", AuthController.forgotPasswordOtp);
//router.post("/resetPassword", AuthController.resetPassword);
//router.post("/checkEmail", AuthController.checkEmail);
//router.post("/verifyEmail", AuthController.verifyEmail);

module.exports = router;
