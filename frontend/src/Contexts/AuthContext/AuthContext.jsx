import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SocketContext } from "../socket Io context/SocketContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(false);
  const [loading, setLoading] = useState(true);

  const verify = async() => {
    // const token = localStorage.getItem("token");
    try {
        const res = await axios.get('http://localhost:4000/api/auth/authenticate',{withCredentials:true});;
        if(res.status == 200){
            setLoading(false)
            setAuthenticate(true);

            
            
        }
    } catch (error) {
        setLoading(false)
        console.log(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticate, setAuthenticate, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
