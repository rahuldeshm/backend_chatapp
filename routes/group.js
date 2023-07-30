const express = require("express");
const groupController = require("../controllers/group");

const groupRoutes = express.Router();

groupRoutes.use("/add", groupController.addGroup);
groupRoutes.use("/users", groupController.getUsers);
groupRoutes.use("/fetch", groupController.fetchGroup);
groupRoutes.use("/getgroupusers/:id", groupController.getGroupusers);
groupRoutes.get("/leavegroup/:id", groupController.leaveGroup);
groupRoutes.post("/adduser", groupController.addUsers);
groupRoutes.post("/changegroupname", groupController.changeGroupname);
groupRoutes.post("/removeusers", groupController.removeUsers);
groupRoutes.post("/editadmins", groupController.editAdmins);

module.exports = groupRoutes;
