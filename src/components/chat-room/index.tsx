import { useLoaderData } from "react-router-dom";
import MessageInput from "../message-input";
import Api from "../../util/api";
import MessageList from "../message-list";

function ChatRoom() {
  const [user, room_id] = useLoaderData() as [Api, number];

  return (
    <>
      <div className="w-[90vw] lg:w-[86vw] flex flex-col bg-gray-900 bg-opacity-75 backdrop-blur-lg rounded  z-10">
        <MessageList user={user} room_id={room_id} />
        <MessageInput user={user} room_id={room_id} />
      </div>
    </>
  );
}

export default ChatRoom;
