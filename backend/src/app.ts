import express from "express";
import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/auth.route";
import chatRoutes from "./routes/chat.route";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/user.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok", message: "server is runnig" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

export default app;
