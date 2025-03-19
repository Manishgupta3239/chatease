import express from "express";
import { GetMessage, SendFile, SendMessage } from "../controllers/messagesControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const app = express.Router();

app.post("/sendMessage",isAuthenticated,(req, res) => {
  SendMessage(req, res);
});

app.post("/sendFile",isAuthenticated,(req, res) => {
  SendFile(req,res);
});

app.post("/getMessage",isAuthenticated,(req, res) => {
  GetMessage(req, res);
});

const messagesRoutes = app;
export default messagesRoutes;