import { Link } from "react-router-dom";
import Api from "../../api";
import useRooms from "../../hooks/useRooms";

interface RoomListProps {
  user: Api;
}

function RoomList(props: RoomListProps) {
  const [rooms] = useRooms(props.user);

  return (
    <ul className="h-[75%] rounded-md bg-gray-800 text-white w-[100%] max-w-64 overflow-y-scroll scrollbar">
      {rooms.map(({ room_id, room_name }) => (
        <li
          key={room_id}
          className="px-6 py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-600"
        >
          <Link to={`/rooms/${room_id}`}>{room_name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default RoomList;
