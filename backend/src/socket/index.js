import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import { socketAuthMiddleware } from "../middlewares/socketMiddleware.js";
import { getUserConversationsForSocket } from "../controllers/conversationController.js";

const app = express();

// MIDDLEWARE
app.use(express.json()); // <--- Bắt buộc để req.body có dữ liệu
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map();


io.on("connection", async (socket) => {
  const user = socket.user;

  console.log(`${user.displayName} online với socket ${socket.id}`);
  
  onlineUsers.set(user._id, socket.id);

  io.emit("online-users", Array.from(onlineUsers.keys()));
  

  const conversationIds = await getUserConversationsForSocket(user._id);

  conversationIds.forEach(id => {
    socket.join(id);
  });


  socket.on("disconnect", () => {
    onlineUsers.delete(user._id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
    
    console.log(`socket disconnected: ${socket.id}`);

  });
});

export { io, app, server };
