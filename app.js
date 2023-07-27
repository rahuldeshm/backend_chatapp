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
const { socketFns } = require("./socket/socket");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);
app.use("/message", authenticate, messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync().then(() => {
  let server = app.listen(3001);
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", socketFns);
});
