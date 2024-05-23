import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Search from "../search";
import RoomList from "../room-list";
import Api from "../../api";

function Navbar() {
  const [show, setShow] = useState(false);
  const [screen_width, setScreenWidth] = useState(window.innerWidth);
  const { user } = useLoaderData() as { user: Api };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div className="flex flex-col justify-between h-screen w-[10vw] bg-gray-500">
      <button
        className="top-0 left-0 p-2 h-15 mb-2 bg-gray-800 text-white z-50 w-fit-content lg:hidden"
        onClick={() => setShow(!show)}
      >
        ☰
      </button>
      {(show || screen_width >= 1024) && (
        <div className="fixed lg:w-[24vw] w-200 h-screen p-5 pt-14 bg-gray-500 z-20">
          <Search />
          <h1>Create Group</h1>
          <br />
          <RoomList user={user} />
          <h1>Sign out</h1>
        </div>
      )}
    </div>
  );
}

export default Navbar;
