const express = require("express");
const messageController = require("../controllers/message");

const messageRoutes = express.Router();

messageRoutes.use("/getmessages/:id", messageController.getmessages);
messageRoutes.use("/newmessage", messageController.newmessage);

module.exports = messageRoutes;
