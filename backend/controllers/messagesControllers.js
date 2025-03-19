import express from "express";
import MessageModel from "../models/messageSchema/messageSchema.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const SendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    // console.log("send data =>",req.body);
    if(req.files){
      try {
        const { senderId, receiverId } = req.body;
        
        const file = req.files?.file; // Access the uploaded photo from files
        if (!file) {
          return res.status(400).json({ message: "No photo file provided!" });
        }
        // Upload photo to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath);
    
        const message = await MessageModel.create({
          senderId,
          receiverId,
          content : result.secure_url
        });
        if (!message) {
          res.status(500).json({ message: "Could not send message" });
        }
        console.log("image => ", message)
        res.status(200).json(message);
      } catch (error) {
        console.log(error);
      }
    }
    const message = await MessageModel.create({
      senderId,receiverId,
      content,
    });
    if (!message) {
      res.status(500).json({ message: "Could not send message" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

export const GetMessage = async (req, res) => {
  try {
    const { receiverId, user } = req.body;
    const senderId = user._id;
    // console.log(receiverId);
    const messages = await MessageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    if (!messages) {
      res.status(500).json({ message: "No message found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const SendFile = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    
    const file = req.files?.file; // Access the uploaded photo from files
    if (!file) {
      return res.status(400).json({ message: "No photo file provided!" });
    }
    // Upload photo to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const message = await MessageModel.create({
      senderId,
      receiverId,
      content : result.secure_url
    });
    if (!message) {
      res.status(500).json({ message: "Could not send message" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

// Handle photo upload and update user profile
// export const SendFil = async (req, res) => {
//   try {
   

//     // Update the user's profile picture URL in MongoDB
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       user._id, // User ID
//       { profilePicture: result.secure_url }, // Set the profile picture URL to Cloudinary URL
//       { new: true } // Return the updated document
//     );

//     // Respond with success and updated user
//     res.status(200).json({
//       message: "Photo uploaded successfully!",
//       photoSource: result.secure_url, // Return the Cloudinary URL of the uploaded photo
//       updatedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error uploading photo", error: err.message });
//   }
// };