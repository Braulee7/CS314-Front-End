import { useState, useEffect } from "react";
import Api, { MessageObj } from "../util/api";

export default function (user: Api, room_id: number) {
  const [messages, setMessages] = useState<MessageObj[]>([]);
  useEffect(() => {
    user.getMessages(room_id).then((messages) => {
      setMessages(messages);
    });
  }, [user, room_id]);
  return messages;
}
