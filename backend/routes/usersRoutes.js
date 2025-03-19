import express from "express";
import { Upload, Users } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const app = express.Router();

app.get("/users",isAuthenticated,(req, res) => {
  Users(req, res);
});

app.post("/upload",isAuthenticated,(req,res)=>{
  Upload(req,res);
})
const usersRoutes = app;
export default usersRoutes;