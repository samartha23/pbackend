import express from "express";
import cors from "cors";
import "./corn/corn.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust this to your needs
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes import
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import postRoutes from "./routes/posts.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import workRoutes from "./routes/works.routes.js";
import educationRoutes from "./routes/education.routes.js";
import spotlightRoutes from "./routes/spotlight.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import prisma from "./prisma/prisma.js";
import { addMessageToQueue } from "./helpers/messageQueue.js";

// Routes declaration
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/posts", postRoutes);
app.use("/skills", skillsRoutes);
app.use("/works", workRoutes);
app.use("/education", educationRoutes);
app.use("/spotlight", spotlightRoutes);
app.use("/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("A user connected => ", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });
  socket.on("create_conversation", async (data, callback) => {
    try {
      const { userId, senderId } = data;
      const newConversation = await prisma.conversation.create({
        data: {
          user1Id: senderId,
          user2Id: userId,
        },
      });
      callback({ conversationId: newConversation.id });
    } catch (error) {
      console.log("error => ", error);
    }
  });
  socket.on("send_message", async (data) => {
    const { conversationId, message, senderId } = data;
    const newMessage = {
      conversationId,
      senderId,
      content: message,
      createdAt: new Date(),
      isRead: false,
    };

    // Fetch sender's details
    try {
      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: {
          firstname: true,
          lastname: true,
          username: true,
          profileImageUrl: true,
        },
      });

      if (!sender) {
        console.error(`Sender with id ${senderId} not found`);
        return;
      }

      // Include sender's details in the message object
      const messageWithSender = {
        ...newMessage,
        sender: {
          firstname: sender.firstname,
          lastname: sender.lastname,
          username: sender.username,
          profileImageUrl: sender.profileImageUrl,
        },
      };

      // Add the new message to the queue
      addMessageToQueue(newMessage);

      // Emit the message to the specific room
      socket.to(conversationId).emit("receive_message", messageWithSender);
      console.log(`Message sent to room ${conversationId}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, httpServer, io };
