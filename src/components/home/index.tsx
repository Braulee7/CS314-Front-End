import Navbar from "../navbar";
import ChatRoom from "../chat-room";

function Home() {
  return (
    <div className="flex justify-between">
      <Navbar />
      <ChatRoom />
    </div>
  );
}

export default Home;
