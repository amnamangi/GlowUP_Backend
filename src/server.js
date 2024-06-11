const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MIDDLEWARES
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// MONGODB URL
mongoose.connect("mongodb://localhost:27017/fyp1_database", { useNewUrlParser: true, useUnifiedTopology: true });

const UserRoutes = require('./user interface/user_routes');
app.use("/api/user", UserRoutes);

const AdminRoutes = require('./admin interface/admin_routes');
app.use("/api/admin", AdminRoutes);

const SellerRoutes = require('./seller interface/seller_routes');
app.use("/api/seller", SellerRoutes);

const AuthRoutes = require('./auth/isAuth_routes');
app.use("/api/auth", AuthRoutes);

const ServicesRoute = require('./services/services_route');
app.use("/api/services", ServicesRoute);

const PORT = 5000;
app.listen(PORT, () => console.log (`server started at port: ${PORT}`));
