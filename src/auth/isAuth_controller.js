const UserModel = require('../models/user_model');
const SellerModel = require("../models/seller_model");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const path = require("path");
const otpGenerator = require("otp-generator");
const sendEmail = require("../helper/handleNodemailer");
const cloudinary = require('cloudinary').v2;

require("dotenv").config();


const AuthController = {

createAccount: async function(req, res) {
  try {
      const { fullName, email, phoneNumber, password, address, city, state } = req.body;
      const newUser = new UserModel({
          fullName,
          email,
          phoneNumber,
          password,
          address,
          city,
          state
      });
      await newUser.save();

      return res.json({ success: true, data: newUser, message: 'account created!' });
  } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error.message || 'An error occurred' });
  }
},

  signIn: async function(req, res) {
    try {
        const { email, password } = req.body;

        const foundUser = await UserModel.findOne({ email: email });
        if (!foundUser) {
            return res.json({ success: false, message: 'User not found!' });
        }

        const passwordMatch = bcrypt.compareSync(password, foundUser.password);
        if (!passwordMatch) {
            return res.json({ success: false, message: 'Incorrect password!' });
        }

        // Password and email are correct, proceed with login
        return res.json({ success: true, data: foundUser });

    } catch (error) {
        console.error('Error during sign-in:', error);
        return res.json({ success: false, message: 'An error occurred' });
    }
},
    
    forgotPasswordOtp : async (req, res, next) => {
        const { email } = req.body;
      
        try {
          const existingUser = await SellerModel.findOne({ email });
          const existingEscort = await Users.findOne({ email });
          if (!existingUser && !existingEscort) {
            return res.json({ success: false, message: "*No user found" });
          }
      
          const htmlFilePath = path.join(__dirname, "./forgotPasseordEmail.html");
          const subject = "Pleasury Forgot Password Request";
      
          const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
          });
      
          await sendEmail(email, subject, htmlFilePath, otp);
      
          return res.json({
            success: true,
            message:
              "Password reset email sent successfully. Please check your inbox.",
            otp,
          });
        } catch (error) {
          console.error(error, "error api=-=-=-=-");
      
          return res.json({
            success: false,
            message:
              " Failed to send the email. Please check your connection and try again.",
            error: error.message,
          });
        }
      },
      
      
      verifyEmail : async (req, res, next) => {
        const { email } = req.body;
      
        try {
          
          const htmlFilePath = path.join(__dirname, "./forgotPasseordEmail.html");
          const subject = "GlowUp Forgot Password Request";
      
          const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
          });
      
          await sendEmail(email, subject, htmlFilePath, otp);
      
          return res.json({
            success: true,
            message:
              "Password reset email sent successfully. Please check your inbox.",
            otp,
          });
        } catch (error) {
          console.error(error, "error api=-=-=-=-");
      
          return res.json({
            success: false,
            message:
              " Failed to send the email. Please check your connection and try again.",
            error: error.message,
          });
        }
      },
      
      resetPassword : async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const existingUser = await UserModel.findOneAndUpdate(
            { email },
            { password: hashPassword }
          );
          return res.json({ success: true, message: "Password change successful." });
        } catch (error) {
          return res.json({
            success: false,
            message: "*Server issue try again later.",
            error,
          });
        }
      },
      
      checkEmail : async (req,res,next)=>{
        const { email } = req.body;
      
        try {
          const existingUser = await UserModel.findOne({ email });
          const existingEscort = await Users.findOne({ email });
          if (!existingUser && !existingEscort) {
            return res.json({ success: true, message: "*No user found" });
          }
      
          return res.json({
            success: false,
            message:
              "email already in use",
      
          });
        } catch (error) {
          console.error(error, "error api=-=-=-=-");
          return res.json({
            success: false,
            message:
              "Please check your connection and try again.",
            error: error.message,
          });
        }
    }
};

module.exports = AuthController