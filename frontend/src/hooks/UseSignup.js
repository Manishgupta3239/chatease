import axios from 'axios';

export const UseSignUp = async (username, email, password, confirmPassword) => {
  // Check if all fields are provided
  if (!username || !email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required." };
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    const data = { username, email, password, confirmPassword };
    
    // Send POST request to backend API for signup
    const response = await axios.post('http://localhost:4000/api/auth/signup', data, { withCredentials: true });

    // Check if the response status is 200 (successful)
    if (response.status === 200) {
      return { success: true, message: "Signup successful!" };
    } else {
      return { success: false, message: "Signup failed. Please try again." };
    }

  } catch (error) {
    // Log and return error if request fails
    console.error('Error during signup:', error);
    return { success: false, message: error.response.data.message };
  }
}
