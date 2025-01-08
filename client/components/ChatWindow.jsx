import { useEffect, useState } from "react";
import { getFormattedTime } from "../src/utils";
import { v4 as uuidv4 } from "uuid";

const ChatWindow = ({ username, roomId, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activityMsg, setActivityMsg] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentMessage(value);

    //emit typing activity
    socket.emit("user_typing", { username, roomId });
  };

  useEffect(() => {
    //user typing
    let timer;

    socket.on("user_typing", (username) => {
      setActivityMsg(`${username} is typing...`);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setActivityMsg("");
      }, 2000);
    });

    return () => {
      socket.off("user_typing");
    };
  });

  const handleSendMessage = (e) => {
    e.preventDefault();

    const uuid = uuidv4();
    //add message obj to messages array
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: uuid,
        username,
        text: currentMessage,
      },
    ]);
    //broadcast to everyone in the array
    socket.emit("send_message", {
      username,
      roomId,
      text: currentMessage,
    });
    setCurrentMessage("");
  };

  useEffect(() => {
    socket.on("message", ({ username, text, type }) => {
      const uuid = uuidv4();
      setMessages((prevMsgs) => [
        ...prevMsgs,
        {
          id: uuid,
          username,
          text,
          type,
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    //nofify the current user that a user has joined
    socket.on(
      "user_join_room",
      (message) => {
        const uuid = uuidv4();
        setMessages((prevMsgs) => [
          ...prevMsgs,
          {
            id: uuid,
            text: message,
            type: "notif",
          },
        ]);
      },
      [socket]
    );

    return () => {
      socket.off("user_join_room");
    };
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      socket.emit("user_left_room", { username, roomId });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, roomId]);

  return (
    <div>
      <div>
        <h2>Room: {roomId}</h2>
        <p>
          Welcome, <span>{username}</span>
        </p>
      </div>
      <div>
        {messages.map((message) => {
          const { id, text, type } = message || {};
          if (type === "notif") {
            return (
              <div key={id} style={{ color: "green" }}>
                {text}
              </div>
            );
          } else {
            return (
              <div key={id} style={{ border: "solid", width: "fit-content" }}>
                <div>
                  <span>{message.username}:</span> <span>{message.text}</span>
                </div>{" "}
                <div>{getFormattedTime()}</div>
              </div>
            );
          }
        })}
        <div>{activityMsg}</div>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatWindow;
