import { useEffect, useState } from "react";
import Api, { RoomObj } from "../api";

export default function (user: Api) {
  const [rooms, setRooms] = useState<RoomObj[]>([]);

  useEffect(() => {
    user
      .getAllRooms()
      .then((room_ids) => {
        setRooms(room_ids);
      })
      .catch((e) => console.error(e));
  }, [user]);

  return [rooms];
}
