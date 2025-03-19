import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({children}) => {

    const[users,setUsers] = useState([]);
    const[tasks,setTasks] = useState([]);
 
    const getData = async (token) => {
      try {
        const response = await axios.get('https://chatease-k9of.onrender.com/api/users/users',{ withCredentials: true });
        
        if (response) {
            // console.log(response.data);
          setUsers(response.data);
        //   setTasks(response.data.task);          
        }
      } catch (error) {
        console.log("Data not submitted", error.messaage);
      }
    };
  
    // useEffect(()=>{
    //   getData();
    // },[token])
  
  return (
    <div>
      <UserContext.Provider value={{users,tasks,getData}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserProvider
