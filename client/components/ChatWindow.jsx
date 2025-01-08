import { useState } from "react";

const ChatWindow = ({ username, roomId, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activityMsg, setActivityMsg] = useState("");
  return <div>  </div>;
};
export default ChatWindow;
