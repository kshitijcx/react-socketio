import { Server } from "socket.io";
import express from "express";

const app = express();

const httpServer = app.listen(3001, () => {
  console.log("server port 3001");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  //listen to user joining room
  socket.on("user_join_room", (data) => {
    const { username, roomId } = data || {};
    socket.join(roomId);
    socket.to(roomId).emit("user_join_room",`${username} joined ${roomId}`)
  });

  //broadcast message to all users
  socket.on("send_message", ({ username, roomId, text }) => {
    socket.to(roomId).emit("message", { username, text, type: "regular" });
  });
});
