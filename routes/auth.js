const express = require("express");
const authController = require("../controllers/auth");

const authRoutes = express.Router();

authRoutes.use("/signup", authController.signup);
authRoutes.use("/signin", authController.signin);

module.exports = authRoutes;
