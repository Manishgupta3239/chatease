import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userSchema/userSchema.js';
dotenv.config();

const KEY = process.env.SECRET_KEY;

export const isAuthenticated = async(req, res, next)=>{
    const token = req.cookies.token;
    if (token) {
      try {
        const data = jwt.verify(token, KEY);
        const username = data.username;
        const user = await UserModel.findOne({username});
        req.body = {...req.body , user,token};
         next();
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
        message: "Session Expired Kindly Login"
        });
      }
    } else {
      console.log("Kindly Login or Register");
      res.status(500).json({
        message: "Kindly Login or SignUp"
      });
    }
  }