import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import axios from 'axios';


function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async() => {
        // Add your logout logic here
        try {
            const res = await axios.get('https://chatease-k9of.onrender.com/api/auth/logout',{withCredentials:true});
            if(res.status == 200){
            alert('Logged out successfully');
            localStorage.clear();
            navigate('/login'); // Redirect to the login page       
            }
        } catch (error) {
            console.log(error);
        }
     
    };

    return (
        <nav className=" text-white shadow-lg p-4 flex items-center justify-between shadow-slate-900">

            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-indigo-400 transition duration-300">
                    ChatEase
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
                <Link
                    to="/profile"
                    className="hover:text-indigo-400 transition duration-300 flex gap-2 items-center"
                >
                    <CgProfile />
                    Profile
                </Link>

                <Link
                    to="/settings"
                    className="hover:text-indigo-400 transition duration-300 flex gap-1 items-center"
                >
                    <CiSettings />
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="py-2 gap-2 items-center px-4 flex rounded-lg font-bold hover:scale-105 transform transition duration-300"
                >
                    <MdLogout />
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
