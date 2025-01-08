import { io } from "socket.io-client";
import JoinChatForm from "../components/JoinChatForm";
import ChatWindow from "../components/ChatWindow";
import { useEffect, useState } from "react";

//init the connection
const socket = io("http://localhost:3001");

function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connection established");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const handleJoinRoom = () => {
    //adding user to the room
    console.log(username, roomId);
    socket.emit("user_join_room", { username, roomId });

    //toggle isInRoom to true
    setIsInRoom(true);
  };

  return (
    <>
      {isInRoom ? (
        <ChatWindow username={username} roomId={roomId} socket={socket} />
      ) : (
        <JoinChatForm
          onJoin={handleJoinRoom}
          username={username}
          setUsername={setUsername}
          roomId={roomId}
          setRoomId={setRoomId}
        />
      )}
    </>
  );
}

export default App;
