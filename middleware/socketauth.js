const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.socketauth = async (socket, next) => {
  console.log("req");
  const token = socket.handshake.auth.token;
  try {
    const userId = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findByPk(userId.id);
    socket.user = user;
    console.log(">>>>>> authorised socket n");
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token."));
  }
};
