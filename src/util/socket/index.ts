import { Socket, io } from "socket.io-client";

export default class {
  constructor(authentication_token: string, room_id: number) {
    const url = `http://localhost:3333`;
    console.log(url);
    this.socket = io(url, {
      auth: { token: authentication_token },
      query: { room_id: room_id },
    });
  }

  close() {
    this.socket.close();
  }

  private socket: Socket;
}
