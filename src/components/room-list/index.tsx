import { Link } from "react-router-dom";
import Api from "../../api";
import useRooms from "../../hooks/useRooms";

interface RoomListProps {
  user: Api;
}

function RoomList(props: RoomListProps) {
  const [rooms] = useRooms(props.user);

  return (
    <ul className="h-[75%] rounded-md overflow-y-auto bg-gray-800 text-white w-64">
      {rooms.map((room_id) => (
        <li
          key={room_id}
          className="px-6 py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-600"
        >
          <Link to={`/rooms/${room_id}`}>{room_id}</Link>
        </li>
      ))}
    </ul>
  );
}

export default RoomList;
