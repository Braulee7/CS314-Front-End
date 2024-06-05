import React from "react";
import useUsers from "../../hooks/useUsers";
import UserLi from "../user-li";
import { useLoaderData } from "react-router-dom";
import Api, { UserObj } from "../../util/api";

interface SearchProps {
  event: (user: string) => void;
  event_name: string;
}

function Search(props: SearchProps) {
  const { user } = useLoaderData() as { user: Api };
  const [username, setUsername, users]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    UserObj[]
  ] = useUsers(user);
  const { event, event_name } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setUsername(value);
  };

  const handleClick = (username: string) => {
    setUsername("");
    event(username);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="search">
        {/*  svg from https://icons8.com/icons/set/search */}
        <svg
          className=" w-5 h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
        >
          <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
        </svg>
      </label>
      <input
        className="border-2 border-gray-300 bg-white h-6 rounded-lg text-sm focus:outline-none"
        type="text"
        name="search"
        value={username}
        onChange={handleChange}
      />
      <div className="overflow-y-scroll scroll max-h-36">
        <ul className="absolute max-h-64 overflow-y-scroll scroll z-10  w-25 pr-10 opacity-90 ml-5 flex flex-col justify-center bg-gray-200 bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
          {users &&
            users.map((user: any) => (
              <UserLi
                key={user.username}
                user={user.username}
                method={handleClick}
                method_name={event_name}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
