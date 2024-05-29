import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Search from "../search";
import RoomList from "../room-list";
import Logout from "../logout";
import Api from "../../api";

function Navbar() {
  const [show, setShow] = useState(false);
  const [screen_width, setScreenWidth] = useState(window.innerWidth);
  const { user } = useLoaderData() as { user: Api };
  const screen_width_threshold = 1080;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="flex flex-col justify-between h-screen w-full max-w-[25vw] lg:max-w-[300px] bg-gray-500">
      {screen_width < screen_width_threshold && (
        <button
          className="top-0 left-0 p-2 h-15 mb-2 bg-gray-800 text-white z-50 w-fit-content"
          onClick={() => setShow(!show)}
        >
          ☰
        </button>
      )}
      {(show || screen_width >= screen_width_threshold) && (
        <div className="fixed lg:w-[24vw] w-200 max-w-64 h-screen p-5 pt-14 bg-gray-500 z-20">
          <Search />
          <h1>Create Group</h1>
          <br />
          <RoomList user={user} />
          <Logout />
        </div>
      )}
    </div>
  );
}

export default Navbar;
