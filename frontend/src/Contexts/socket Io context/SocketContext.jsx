import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const url = "http://localhost:4000";
  const token = localStorage.getItem("token"); // Fetch the token from localStorage

  // Socket connection function
  const SocketConnection = () => {
    // Create the socket instance and provide the token for authentication
    const socketInstance = io(url, {
      query: { token },
    });

    // Set the socket instance in state
    setSocket(socketInstance);

    // Listen for connection and disconnection events
    socketInstance.on("connect", () => {
      console.log("Connected to server:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Return the socketInstance so it can be used for cleanup
    return socketInstance;
  };

  useEffect(() => {
    // Create the socket connection only if the token is available and socket isn't already set
    if (token && !socket) {
      const socketInstance = SocketConnection(); // Call SocketConnection to create a socket

      return () => {
        if (socketInstance) {
          socketInstance.disconnect(); // Cleanup by disconnecting the socket
        }
      };
    }

    // // If token changes, disconnect the existing socket and create a new one
    // if (token && socket) {
    //   socket.disconnect(); // Disconnect the existing socket
    //   const socketInstance = SocketConnection(); // Create a new socket
    //   return () => socketInstance.disconnect(); // Clean up new socket
    // }

    return () => {}; // No cleanup if token or socket is not present
  }, [token]); // Re-run the effect if token changes

  return (
    <SocketContext.Provider value={{ socket, SocketConnection }}>
      {children}
    </SocketContext.Provider>
  );
};