import { UserModel } from "../models/userSchema/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all users
export const Users = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Handle photo upload and update user profile
export const Upload = async (req, res) => {
  try {
    // Get user and photo from request body and files
    const { user } = req.body; // Assuming user is in body and contains user._id
    const photo = req.files?.photo; // Access the uploaded photo from files
    if (!photo) {
      return res.status(400).json({ message: "No photo file provided!" });
    }

    // Upload photo to Cloudinary
    const result = await cloudinary.uploader.upload(photo.tempFilePath);

    // Update the user's profile picture URL in MongoDB
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id, // User ID
      { profilePicture: result.secure_url }, // Set the profile picture URL to Cloudinary URL
      { new: true } // Return the updated document
    );

    // Respond with success and updated user
    res.status(200).json({
      message: "Photo uploaded successfully!",
      photoSource: result.secure_url, // Return the Cloudinary URL of the uploaded photo
      updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading photo", error: err.message });
  }
};
