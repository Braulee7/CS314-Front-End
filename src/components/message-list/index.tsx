import { useContext } from "react";
import Message from "../message";
import { WebSocketContext } from "../../context/socket-context";

function MessageList() {
  const { messages } = useContext(WebSocketContext);

  return (
    <div className="h-[95vh]">
      <ul className="flex flex-col overflow-y-scroll scrollbar ">
        {messages.map((message) => (
          <li key={message.message_id}>
            <Message
              content={message.message}
              sender={message.sending_user}
              timestamp={message.date_sent}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
