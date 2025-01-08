
import { io } from "socket.io-client";
import JoinChatForm from "../components/JoinChatForm";
import ChatWindow from "../components/ChatWindow";
import { useEffect, useState } from "react";

//init the connection
const socket = io("http://localhost:3001");

function App() {
  const [isInRoom, setIsInRoom] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connection established");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return <>{isInRoom ? <ChatWindow /> : <JoinChatForm />}</>;
}

export default App;