import Api, { MessageObj } from "../../util/api";
import Message from "../message";
import useMessages from "../../hooks/useMessages";

interface MessageListProps {
  user: Api;
  room_id: number;
}

function MessageList(props: MessageListProps) {
  const { user, room_id } = props;
  const messages: MessageObj[] = useMessages(user, room_id);
  console.log(messages);
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
