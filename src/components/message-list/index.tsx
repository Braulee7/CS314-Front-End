import { forwardRef, useEffect } from "react";
import Api, { MessageObj } from "../../util/api";
import Message from "../message";
import Socket from "../../util/socket";
import useMessages from "../../hooks/useMessages";

interface MessageListProps {
  user: Api;
  room_id: number;
}

const MessageList = forwardRef<Socket, MessageListProps>(function (props, ref) {
  const { user, room_id } = props;
  const { messages, setMessages } = useMessages(user, room_id);

  useEffect(() => {
    const updateMessages = (new_message: MessageObj) => {
      setMessages((prev_messages) => [...prev_messages, new_message]);
    };
    if (ref?.current) {
      ref?.current.registerMessageReceiver(updateMessages);
    }
  }, [ref]);

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
});

export default MessageList;
