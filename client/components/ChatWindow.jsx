import { useState } from "react";

const ChatWindow = ({ username, roomId, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activityMsg, setActivityMsg] = useState("");
  return (
    <div>
      <div>
        <h2>Room: {roomId}</h2>
        <p>
          Welcom, <span>{username}</span>
        </p>
      </div>
      <div>
        {messages.map((message) => {
          const { id, text, type, userName } = message || {};
          if (type === "notif") {
            return (
              <div key={id} style={{ color: "green" }}>
                {text}
              </div>
            );
          }else{
            return(
                <div key={id}>
                    
                </div>
            )
          }
        })}
      </div>
    </div>
  );
};
export default ChatWindow;
