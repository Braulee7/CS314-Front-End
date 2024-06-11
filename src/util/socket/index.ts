import { Socket, io } from "socket.io-client";
import { MessageObj } from "../api";

type MessageUpdater = (message: MessageObj) => void;
export default class {
  constructor(authentication_token: string, room_id: number) {
    const url = `https://minstant-messenger-back-end.onrender.com`;
    this.socket = io(url, {
      auth: { token: authentication_token },
      query: { room_id: room_id },
    });
  }

  emitMessage(message: MessageObj) {
    this.socket.emit("send message", message);
  }

  registerMessageReceiver(updateMessages: MessageUpdater) {
    this.socket.on("receive message", (message_obj: MessageObj) => {
      updateMessages(message_obj);
    });
  }

  close() {
    this.socket.close();
  }

  private socket: Socket;
}
