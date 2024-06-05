// Code adapted from Microsoft Copilot
import React, { createContext, useEffect, useRef } from "react";
import Api, { MessageObj } from "../../util/api";
import Socket from "../../util/socket";
import useMessages from "../../hooks/useMessages";

interface WebSocketContextProps {
  messages: MessageObj[];
  emitMessage: (message: MessageObj) => void;
}

export const WebSocketContext = createContext<WebSocketContextProps>({
  messages: [],
  emitMessage: () => () => ({}),
});

export const WebSocketProvider: React.FC<{
  user: Api;
  room_id: number;
  children: React.ReactNode;
}> = ({ user, room_id, children }) => {
  const { messages, setMessages } = useMessages(user, room_id);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = new Socket(user.AccessToken, room_id);

    socketRef.current?.registerMessageReceiver(updateMessages);
    // close connection when unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user, room_id]);

  const emitMessage = (message: MessageObj) => {
    if (socketRef.current) {
      socketRef.current.emitMessage(message);
    }
  };

  const updateMessages = (message: MessageObj) => {
    setMessages((prev_messages) => [...prev_messages, message]);
  };

  return (
    <WebSocketContext.Provider value={{ messages, emitMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
