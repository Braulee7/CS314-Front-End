import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Search from "../search";
import RoomList from "../room-list";
import Logout from "../logout";
import CreateGroupForm from "../create-group-form";
import Api from "../../util/api";

function Navbar() {
  const [show, setShow] = useState(false);
  const [screen_width, setScreenWidth] = useState(window.innerWidth);
  const [showCGForm, setShowCGForm] = useState(false);
  const { user } = useLoaderData() as { user: Api };
  const nav = useNavigate();
  const screen_width_threshold = 1080;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const createDmRoom = async (username: string) => {
    try {
      let room_id = await user.CheckRoomExists(username);
      if (room_id === -1) {
        // create a new room and redirect to it
        room_id = await user.createDirectMessageRoom(username);
      }
      nav(`/rooms/${room_id}`);
    } catch (e) {
      // TODO: Add error message to UI
      console.log(e);
    }
  };

  return (
    <>
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
            <Search event={createDmRoom} event_name="message" />
            <button
              className="p-2 bg-cyan-950 text-white w-full mt-2"
              onClick={() => setShowCGForm(!showCGForm)}
            >
              Create Group
            </button>
            <br />
            <RoomList user={user} />
            <Logout />
          </div>
        )}
      </div>
      {showCGForm && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 z-50 m-4 max-w-xs mx-auto flex justify-center flex-col lg:max-w-lg">
            <button
              className="bg-red-500 p-2 text-gray-200 rounded-md"
              onClick={() => setShowCGForm(false)}
            >
              Close
            </button>
            <CreateGroupForm closer={() => setShowCGForm(false)} />
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </>
  );
}

export default Navbar;
