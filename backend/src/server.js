import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import { protectedRoute } from "./middlewares/authMiddlewares.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/index.js"; // chỉ import app và server

dotenv.config();
const PORT = process.env.PORT || 5001;

// Middleware (trên app đã import từ socket)
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Public routes
app.use("/api/auth", authRoute);

// Private routes
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

// Start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
  });
});
