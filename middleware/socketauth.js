exports.socketauth = (socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  next();
};
