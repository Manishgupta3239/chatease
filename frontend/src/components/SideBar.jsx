import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/AuthContext/UserContext";
import { RiContactsLine } from "react-icons/ri";
import { SocketContext } from "../Contexts/socket Io context/SocketContext";
import { Socket } from "socket.io-client";


const SideBar = ({receiver,setMessages,newMessage,loading,status,messages}) => {

  const {users } = useContext(UserContext);
  const Loggeduser = JSON.parse(localStorage.getItem("sender"));
  const [count, setCount] = useState(0);
  const [reading , setReading] = useState(false);

  const setLength = (userId)=>{
    setCount(messages.filter((message)=>(message.senderId === userId)).length)
  }

  // useEffect(() => {
  //   if(! messages){
  //     return
  //   }
  //   setLength
  //   return () => {
  //     setCount(0);     
  //   }
  // }, [messages])
  
  return (
    <div className=" w-[25%] px-2 bg-slate-950 border-r-2">
      <div className="text-white h-20">
        <div className="flex py-3 font-semibold space-x-3 items-center">
          <span>{<RiContactsLine />}</span>
          <h4>Contacts</h4>
        </div>
        <p className="font-semibold">Show online only</p>
      </div>

      {/* contact list */}
      <div className="text-white overflow-auto h-[71vh] space-y-1">
        {users.map((user) => (
          <div className="  h-20 flex space-x-3 z-50 py-3 " onClick={()=>(receiver(user),setMessages([]),newMessage('') ,setReading(true),loading(true)) } key={user._id}>
            <img src={user.profilePicture} className="rounded-full h-14 w-14 mt-1 z-20" />
            <div className="z-20 ">
              <p className="font-semibold text-[21px] inline-block">{user.username == Loggeduser.username ? ('me'):(user.username)}</p> 
              {/* {messages.length > 0 ? (messages.map((message)=>(
                message.senderId == user._id  ? (<>{setCount(messages.filter((message)=>(message.senderId === user._id)).length) }</>):('')
              ))):('')} */}
              {/* {setLength(user._id)}  */}
              {! reading && (<span className="ml-10 rounded-full  size-5 inline-block bg-green-500  text-center text-[15px]">{count}</span>)}
              
              <p className="text-green-400">  { status ? (status.senderId === user._id ? (status.status):("")):("")  }</p>
            
            </div>
          </div>
        ))}
      </div>

      {/* contact list */}
    </div>
  );
};

export default SideBar;