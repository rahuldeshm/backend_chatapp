const express = require("express");
const authController = require("../controllers/auth");

const authRoutes = express.Router();

authRoutes.use("/signup", authController.signup);

module.exports = authRoutes;
