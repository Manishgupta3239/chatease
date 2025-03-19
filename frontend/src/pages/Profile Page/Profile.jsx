import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import image from "../../assets/Manish.jpeg";
import { UserContext } from "../../Contexts/AuthContext/UserContext";
import { FaCamera } from "react-icons/fa6";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("sender"));

  const [photo, setPhoto] = useState();
  const [loading , setLoading] =useState(false);
  const [preview, setPreview] = useState(); // Default profile image or placeholder

  // Function to handle file input change
  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); // Update the preview
    }
  };

  // Function to upload the photo to the backend
  const handleUpload = async () => {
    if (!photo) {
      alert("Please select a photo to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:4000/api/users/upload", formData, { withCredentials: true }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Photo uploaded successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />
      <div className="flex justify-center h-full">
        <div className="bg-gray-900 w-[40%] h-[70vh] mt-20 text-white">
          <p className="text-white text-[35px] font-semibold mx-[40%] mt-4">Profile</p>
          <p className="text-white text-[15px] w-[30%] font-semibold mx-auto">
            Your profile information
          </p>

          <div className=" flex items-center justify-center">
          
           <div className="h-[20vh] bg-low-400 text-black w-[30%] relative">
           {loading ? (<div className="flex items-center justify-center bg-transparent"><ClipLoader /></div>):(  <img
              src={preview || user.profilePicture}
              alt="profile photo"
              className="rounded-full size-24 mx-auto mt-5 border-2 border-white"
            />)}
          
           </div>
            <label htmlFor="photo" className="absolute  cursor-pointer">
              <FaCamera className="bg-blue-500 p-2 rounded-full text-white" />
            </label>
            <input type="file" id="photo" className="hidden" onChange={handleChange} />
          </div>

          <button
            onClick={handleUpload}
            className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Photo
          </button>

          <span className="mt-2 mx-4 text-[15px]">Full Name</span>
          <p className="text-white mt-1 h-8 py-1 border border-white mx-4 px-2 font-semibold">
            {user.username}
          </p>
          <span className="mt-2 block mx-4 text-[15px]">Email Address</span>
          <p className="text-white mt-1 h-8 py-1 border border-white mx-4 px-2 font-semibold">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;