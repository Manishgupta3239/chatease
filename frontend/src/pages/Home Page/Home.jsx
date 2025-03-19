import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { SocketContext } from "../../Contexts/socket Io context/SocketContext";
import { UserContext } from "../../Contexts/AuthContext/UserContext";
import SideBar from "../../components/SideBar";
import { ClipLoader } from "react-spinners";
import Welcome from "../../components/Welcome";
import { IoMdSend } from "react-icons/io";
import { PiPlusBold } from "react-icons/pi";

function Home() {
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]); // real-time messages
  const [oldMessages, setOldMessages] = useState([]); // messages from databse
  const [handleFileInput, setHandleFileInput] = useState(); // handle File Input
  const [newMessage, setNewMessage] = useState(""); // text message
  const { getData } = useContext(UserContext); // fetch the users
  const [receiver, setReceiver] = useState(); //receiver object
  const Loggeduser = JSON.parse(localStorage.getItem("sender"));
  const [status, setStatus] = useState(null);
  const [preview , setPreview] = useState();

  const handleSendMessage = () => {
    const data = {
      receiverId: receiver._id,
      senderId: Loggeduser._id,
      content: newMessage,
    };
    socket.emit("message", { data, receiver: receiver.username });
    setNewMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage == "") {
      return alert("Invalid input");
    }
    handleSendMessage(); // emit the message event
    try {
      const formData = new FormData();
      formData.append("receiverId", receiver._id,);
      formData.append("senderId",Loggeduser._id);
      formData.append("content",newMessage);
      if(handleFileInput){
        formData.append("file",handleFileInput);
        setPreview(URL.createObjectURL(handleFileInput));
      }
      const response = await axios.post(
        "http://localhost:4000/api/messages/sendMessage", //send message to database
        formData,
        { withCredentials: true }
      );
      if (response.status == 200) {
        console.log("message sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const data = {
      receiverId: receiver._id,
      senderId: Loggeduser._id,
      receiver: receiver.username,
      status: "Typing...",
    };

    if (e.target.value != "") {
      socket.emit("typing", data);
    } else {
      socket.emit("typing", { ...data, status: "" });
    }
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    const getMessage = async () => {
      if (!receiver) return;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/messages/getMessage",
          { receiverId: receiver._id },
          { withCredentials: true }
        );

        if (response.status == 200) {
          setOldMessages(response.data);
          setLoading(false);
          // console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMessage();
  }, [receiver]);

  useEffect(() => {
    // Add the event listener once when the component is mounted
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setStatus(null);
    };
    socket.on("receiver", handleReceiveMessage);

    socket.on("online", (Loggeduser) => {});

    //typing event listener
    socket.on("typing", (data) => {
      setStatus(data);
    });

    socket.emit("online", Loggeduser);
    getData();

    // Cleanup the event listener when the component is unmounted
    return () => {
      socket.off("receiver", handleReceiveMessage);
      console.log("socket off");
    };
  }, [socket]); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, oldMessages]);

  return (
    <div className="h-screen ">
      <Navbar />

      <div className="  flex justify-center mt-8 ">
        <SideBar
          receiver={setReceiver}
          newMessage={setNewMessage} //to empty input field
          setMessages={setMessages} //to empty messages field
          loading={setLoading}
          status={status}
          messages={messages}
        />
        {!receiver ? (
          <Welcome />
        ) : (
          <div className=" w-[65%] bg-slate-950 px-9">
            <div className="text-white h-16 pt-3 flex  space-x-2 items-center bg-yellow">
              <img
                src={receiver.profilePicture}
                className="rounded-full size-12"
              />
              <div className="  font-semibold text-[17px]">
                <h4>
                  {receiver.username == Loggeduser.username
                    ? "me"
                    : receiver.username}
                </h4>
                <p className="font-semibold text-green-400">
                  {status
                    ? status.senderId === receiver._id
                      ? status.status
                      : ""
                    : ""}
                  {/* {status} */}
                </p>
              </div>
            </div>
            {handleFileInput && <div className="bg-white bottom-40  absolute h-[50vh] z-40 w-[60%]">
                <img src={preview} className="h-10 w-10"/>
              </div> }
            {/* chat display sectino */}
            {loading ? (
              <div className=" py-3 h-[60vh] text-white flex items-center justify-center ">
                <ClipLoader size={50} />
              </div>
            ) : (
              
              <div
                className="py-3 h-[60vh] text-white overflow-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-950"
                id="chatContainer"
              >
             
                <div className="flex space-x-2 ">
                  <div className="w-full space-y-3 relative z-0">
                    {oldMessages.concat(messages).map((message, index) => (
                      <div
                        className={`flex w-full ${
                          message.senderId === Loggeduser._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        key={index}
                      >
                        <p
                          className={`max-w-[40%] py-2 px-2 text-black rounded-[10px] break-words whitespace-normal ${
                            message.senderId === Loggeduser._id
                              ? "bg-green-600 rounded-tl-none "
                              : "rounded-tr-none bg-white"
                          }`}
                        >
                          {message.content}
                        </p>
                        <span className="text-[12px]">
                          {message.createdAt
                            ? new Date(message.createdAt).toLocaleTimeString()
                            : new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                
                {/* Keep this on top */}
                </div>
             
              </div>
            )}
            
            <form className="flex mt-3 items-center" onSubmit={handleSubmit}>
              <label htmlFor="photo">
              <PiPlusBold
                className={`  rounded-[15px] text-white h-8 w-8`}

              />
            </label>

            <input type="file" id="photo" className="hidden" onChange={(e)=>setHandleFileInput(e.target.files[0])}/>

              <textarea 
                placeholder="enter message"
                className="bg-transparent resize-none  h-10 w-full scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-950 px-4 pt-2 text-white rounded-[13px]  outline-none text-[17px] relative "
                value={newMessage}
                onChange={handleChange}
              />
              <button
                // className="bg-green-700 w-20 rounded-[15px]"
                className={`absolute right-[120px] rounded-[15px] text-white h-10 w-10 ${
                  newMessage == "" ? "hidden" : "block"
                }`}
                type="submit"
              >
                <IoMdSend className="size-10" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;