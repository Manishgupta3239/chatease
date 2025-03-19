import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Contexts/AuthContext/AuthContext";
import { SocketContextProvider } from "./Contexts/socket Io context/SocketContext";
import UserProvider from "./Contexts/AuthContext/UserContext";

createRoot(document.getElementById("root")).render(
  <>
    <SocketContextProvider>
      <UserProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserProvider>
    </SocketContextProvider>
  </>
);
