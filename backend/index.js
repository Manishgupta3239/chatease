import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import ConnectionDb from "./mongoDb/Connection.js";
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import usersRoutes from "./routes/usersRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import fileUpload from "express-fileupload"; // Middleware for file handling

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: "https://chatease-a11c7.web.app", // Allow all origins, you can replace "*" with specific domains like ["http://localhost:3000"] for more security
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies or authentication credentials
  })
);

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chatease-a11c7.web.app", // Client's URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

try {
  server.listen(PORT, () => {
    ConnectionDb();
    console.log("Listening to Port", PORT);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded.username;
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`User ${socket.user} connected`);
  console.log("IO => ",socket.user)
  socket.join(socket.user);
  
  //send message event
  socket.on("message", ({ data, receiver }) => {
    console.log("received =>",data);
    socket.join(receiver);
    io.to(receiver).emit("receiver", data);
  });

  //typing event
  socket.on("typing", (data)=>{ 
    // console.log("typing=>",data,status,receiver)
    console.log("receiver=> ",data.receiver)
    socket.to(data.receiver).emit("typing",data);
  });

  //online event
  socket.on("online", (LoggedUser) => {
    // console.log("Looged Usre" , LoggedUser);
    io.emit("online",LoggedUser);
  });
  
  //disconnect
  socket.on("disconnect", (socket) => {
    console.log("User disconected id:", socket.id);
  });
});
