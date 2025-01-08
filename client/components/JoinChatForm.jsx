const JoinChatForm = ({ onJoin, username, setUsername, roomId, setRoomId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin();
  };

  return (
    <div>
      <h1>Join a Room to Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="text"
          placeholder="Enter a room name"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          required
        />
        <button type="submit">Join Room Now</button>
      </form>
    </div>
  );
};
export default JoinChatForm;
