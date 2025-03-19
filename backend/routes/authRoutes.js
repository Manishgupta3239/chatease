import express from "express";
import { Login, Logout, SignUp } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const app = express.Router();

app.post("/login", (req, res) => {
  Login(req, res);
});
app.post("/signup", (req, res) => {
  SignUp(req, res);
});
app.get("/logout", (req, res) => {
  Logout(req, res);
});
app.get("/authenticate",isAuthenticated,(req, res) => {
    try {
      const{user} = req.body;
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
});

const authRoutes = app;
export default authRoutes;
