const JoinChatForm = () => {
    return (
      <div>
        <h1>Join a Room to Chat</h1>
        <form>
          <input type="text" placeholder="Enter your name" required />
          <input type="text" placeholder="Enter a room name" required />
          <button type="submit">Join Room Now</button>
        </form>
      </div>
    );
  };
  export default JoinChatForm;