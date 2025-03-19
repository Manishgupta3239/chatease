import axios from 'axios';

export const UseLogin =async(username,password)=>{
    if(! username || !password){
        return {success:false , message : "All fields are required"}
    }
    try {
        const data = {username,password};
        const response = await axios.post('http://localhost:4000/api/auth/login', data, { withCredentials: true });
        if(response.status == 200){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('sender', JSON.stringify(response.data.data));
            localStorage.setItem('senderId',response.data.data._id)
            return {success:true , message: "Successfully Logged In"}
        }else{
            return {success:false , message: "Login failed. Please try again."}
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return { success: false, message: error.response.data.message };
      }
}