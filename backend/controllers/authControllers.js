import express from "express";
import { UserModel } from "../models/userSchema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const userFound = await UserModel.findOne({ username });
    const emailFound = await UserModel.findOne({ email });

    if (!username || !email || !password || !confirmPassword) {
      return res.status(404).json({ message: "All field are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(404).json({ message: "Invalid Email Address" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    if (password !== confirmPassword) {
      return res
        .status(404)
        .json({ message: "Password and Confirm Password must match" });
    }

    if (userFound || emailFound) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(200).json({ message: "Successfully Signed Up", data: user });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error while signing up " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in signUp route" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by username or email
    const userFound = await UserModel.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!userFound) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Verify password
    const verify = await bcrypt.compare(password, userFound.password);
    if (!verify) {
      return res.status(401).json({ message: "Password Incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: userFound.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000, // 1 hour
      path: "/",
    });

    res.status(200).json({
      message: "Successfully Logged in",
      data: userFound,
      token,
    });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Error in Login route" });
  }
};

export const Logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error in Logout:", error);
    res.status(500).json({ message: "Error during logout" });
  }
};
