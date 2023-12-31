const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const sequelize = require("./util/db");
const cors = require("cors");
const User = require("./models/user");
const Message = require("./models/message");
const authenticate = require("./middleware/authenticate");
const Group = require("./models/group");
const groupRoutes = require("./routes/group");
const Usergroup = require("./models/usergroup");
const { socketRoutes } = require("./routes/socket");
const { socketauth } = require("./middleware/socketauth");
const uploadRoutes = require("./controllers/upload");
const multer = require("multer");

const app = express();
const upload = multer();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  "/upload",
  upload.single("file"),
  authenticate,
  uploadRoutes.newmessagefile
);

app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);
app.use("/message", authenticate, messageRoutes);
app.use("/group", authenticate, groupRoutes);

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: Usergroup });
Group.belongsToMany(User, { through: Usergroup });

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize.sync().then(() => {
  let server = app.listen(3001);
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.use(socketauth);
  io.on("connection", socketRoutes);
});
