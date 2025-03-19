import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseLogin } from '../../hooks/UseLogin';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { SocketContext } from '../../Contexts/socket Io context/SocketContext';

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const{setAuthenticate}  =useContext(AuthContext);
  const {SocketConnection} = useContext(SocketContext)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await UseLogin(form.username, form.password);

    setIsSubmitting(false);

    if (result.success) {
      alert(result.message);
      setAuthenticate(true);
      SocketConnection();
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col justify-center items-center text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
          Welcome Back to <span className="text-indigo-500">ChatEase</span>
        </h1>
        <p className="text-gray-400 max-w-lg">
          Log in to your account and reconnect with your friends and community.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-gray-200 p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-400 mb-2"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your username or Email"
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-400 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold transition-transform transform duration-300 shadow-lg ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-500 hover:scale-105 hover:bg-indigo-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p className="mt-6">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-bold text-indigo-400 underline hover:text-indigo-200"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;