import { useLoaderData } from "react-router-dom";
import MessageInput from "../message-input";
import Api from "../../util/api";
import MessageList from "../message-list";
import Socket from "../../util/socket";
import { useEffect, useRef } from "react";

function ChatRoom() {
  const [user, room_id] = useLoaderData() as [Api, number];
  // lines 11-20 from Microsoft Copilot :)
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = new Socket(user.AccessToken, room_id);

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user, room_id]);

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
