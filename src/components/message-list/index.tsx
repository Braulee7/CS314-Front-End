import { useContext, useRef, useEffect } from "react";
import Message from "../message";
import { WebSocketContext } from "../../context/socket-context";

function MessageList() {
  const { messages } = useContext(WebSocketContext);
  const recently_sent_message_ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (recently_sent_message_ref.current) {
      recently_sent_message_ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-[95vh] overflow-y-scroll scrollbar">
      <ul className="flex flex-col ">
        {messages.map((message, index) => (
          <li
            key={message.message_id}
            ref={
              index === messages.length - 1 ? recently_sent_message_ref : null
            }
          >
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
