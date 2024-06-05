import { useEffect, useState } from "react";
import Api, { RoomObj } from "../util/api";

let setSharedRooms: React.Dispatch<React.SetStateAction<RoomObj[]>> | null =
  null;

export const updateRooms = (newRoom: RoomObj) => {
  if (setSharedRooms) {
    setSharedRooms((prev) => {
      const newRooms = prev.filter((room) => room.room_id !== newRoom.room_id);
      return [...newRooms, newRoom];
    });
  }
};

export function useRooms(user: Api) {
  const [rooms, setRooms] = useState<RoomObj[]>([]);

  setSharedRooms = setRooms;

  useEffect(() => {
    user
      .getAllRooms()
      .then((room_ids) => {
        setRooms(room_ids);
      })
      .catch((e) => console.error(e));
  }, [user]);

  return { rooms, setRooms };
}
