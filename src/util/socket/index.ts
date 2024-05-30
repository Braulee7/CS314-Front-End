import { Socket, io } from "socket.io-client";
import { MessageObj } from "../api";

export default class {
  constructor(authentication_token: string, room_id: number) {
    const url = `http://localhost:3333`;
    this.socket = io(url, {
      auth: { token: authentication_token },
      query: { room_id: room_id },
    });
  }

  sendMessage(message: MessageObj) {
    this.socket.emit("send message", message);
  }

  registerMessageReceiver(updateMessages: (message: MessageObj) => void) {
    console.log("Registering a receiver");
    this.socket.on("receive message", (message_obj: MessageObj) => {
      console.log("received message: ", message_obj);
      updateMessages(message_obj);
    });
  }

  close() {
    this.socket.close();
  }

  private socket: Socket;
}
