exports.socketRoutes = (socket) => {
  //   console.log(socket.user.username);
  socket.on("createroom", (roomname) => {
    console.log(roomname, socket.user.username, "joined");
    socket.join(roomname);
    socket
      .to(roomname)
      .emit("becamelive", { user: socket.user, msg: "JOINED" });
  });
  socket.on("send", (message, roomname, url) => {
    socket.to(roomname).emit("receive", {
      user: socket.user,
      msg: message,
      url,
    });
  });
  socket.on("leaveroom", (roomname) => {
    console.log(roomname, socket.user.username, "leaved");
    socket.leave(roomname);
    socket
      .to(roomname)
      .emit("becamelive", { user: socket.user, msg: "LEAVED" });
  });
  socket.on("disconnect", () => {
    console.log(socket.user.username, "disconnected");
    // socket.broadcast.emit("left", users[socket.id]);
    // delete users[socket.id];
  });
};
