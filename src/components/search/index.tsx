import React from "react";
import useUsers from "../../hooks/useUsers";
import UserLi from "../user-li";
import { useNavigate, useLoaderData } from "react-router-dom";
import Api, { UserObj } from "../../api";

function Search() {
  const { user } = useLoaderData() as { user: Api };
  const [username, setUsername, users]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    UserObj[]
  ] = useUsers(user);
  const nav = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setUsername(value);
  };

  const message = async (username: string) => {
    try {
      const roomid = await user.CheckRoomExists(username);
      if (roomid === -1) {
        // create a new room and redirect to it
        // TODO: create a new room
        console.log("room does not exist");
      } else {
        nav(`/rooms/${roomid}`);
      }
    } catch (e) {}
  };

  return (
    <div>
      <input
        className="border-2 border-gray-300 bg-white h-6 rounded-lg text-sm focus:outline-none"
        type="text"
        value={username}
        onChange={handleChange}
      />
      <div>
        <ul className="absolute z-10  w-25 pr-10 opacity-90 ml-5 flex flex-col justify-center bg-blue-800 bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
          {users &&
            users.map((user: any) => (
              <UserLi
                key={user.username}
                user={user.username}
                method={message}
                method_name="Message"
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
