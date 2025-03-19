import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseSignUp } from '../../hooks/UseSignup';

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await UseSignUp(form.username, form.email, form.password, form.confirmPassword);
    setIsSubmitting(false);

    if (result.success) {
      alert(result.message);
      navigate('/login');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 text-white">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-100">Sign Up</h1>
          <p className="text-gray-400 text-sm mt-2">
            Create your account to join <span className="text-indigo-400 font-semibold">ChatEase</span>.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
              onChange={handleChange}
              value={form.username}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
