const express = require("express");
const messageController = require("../controllers/message");

const messageRoutes = express.Router();

messageRoutes.use("/newmessage", messageController.newmessage);
messageRoutes.use("/getmessages", messageController.getmessages);

module.exports = messageRoutes;
