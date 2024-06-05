import { Link, useNavigate } from "react-router-dom";
import Api, { RoomObj } from "../../util/api";
import useRooms from "../../hooks/useRooms";

interface RoomListProps {
  user: Api;
}

function RoomList(props: RoomListProps) {
  const { rooms, setRooms } = useRooms(props.user);
  const navigate = useNavigate();

  const deleteRoom = async (roomID: number) => {
    try {
      await props.user.deleteRoom(roomID);
      setRooms((prevRooms: RoomObj[]) =>
        prevRooms.filter((room: RoomObj) => room.room_id !== roomID)
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ul className="h-[75%] rounded-md bg-gray-800 text-white w-[100%] max-w-64 overflow-y-scroll scrollbar">
      {rooms.map(({ room_id, room_name }) => (
        <li
          key={room_id}
          className=" flex justify-between px-6 py-2 border-b border-gray-700"
        >
          <Link
            className="cursor-pointer max-w-[65%] rounded-sm p-2 border-4 overflow-hidden bg-cyan-950 hover:bg-gray-600 whitespace-nowrap"
            to={`/rooms/${room_id}`}
          >
            <span
              className={`inline-block pb-1 mx-2 ${
                room_name.length > 15 ? "animate-marquee" : ""
              }`}
            >
              {room_name}
            </span>
          </Link>
          <button
            onClick={() => deleteRoom(room_id)}
            className="bg-red-500 hover:bg-red-700 flex justify-center items-center rounded w-[25%] max-w-[25%]"
          >
            {/* svg from https://icons8.com/icon/83219/trash-can */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19 5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"></path>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default RoomList;
