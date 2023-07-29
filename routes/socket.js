// const socketController = require("../controllers/socket");

// exports.socketRoutes = (socket) => {
//   socket.on("new-user-joined", (socket, name) => {
//     console.log(socket.id, "<<<<<");
//     users[socket.id] = name;
//     socket.broadcast.emit("user-joined", name);
//   });

//   socket.on("send", socketController.newMessage);
//   socket.on("disconnect", (message) => {
//     socket.broadcast.emit("left", users[socket.id]);
//     delete users[socket.id];
//   });
// };
