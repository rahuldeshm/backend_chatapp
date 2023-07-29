const express = require("express");
const groupController = require("../controllers/group");

const groupRoutes = express.Router();

groupRoutes.use("/add", groupController.addGroup);
groupRoutes.use("/users", groupController.getUsers);
groupRoutes.use("/fetch", groupController.fetchGroup);

module.exports = groupRoutes;
