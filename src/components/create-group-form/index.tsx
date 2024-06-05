import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { updateRooms } from "../../hooks/useRooms";
import ErrorMessage from "../error-message";
import Search from "../search";
import Api from "../../util/api";

interface CreateGroupFormProps {
  closer: () => void;
}

function CreateGroupForm(props: CreateGroupFormProps) {
  const { user } = useLoaderData() as { user: Api };
  const [members, setMembers] = useState<string[]>([]);
  const [room_name, setRoomName] = useState<string>("");
  const [error_message, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const addMember = (member: string) => {
    // make sure user is not already in member list
    if (!members.includes(member)) {
      setMembers((prev_members) => [...prev_members, member]);
    }
  };
  const createGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const room_id = await user.createGroup(members, room_name);
      navigate(`/rooms/${room_id}`);
      props.closer();
      updateRooms({ room_id, room_name });
    } catch (e) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <ErrorMessage message={error_message} />
      <div className="flex flex-col align-middle lg:flex-row">
        <form
          className="flex flex-col align-middle justify-center bg-gray-500 p-3 rounded-lg w-200 lg:w-300 m-2"
          onSubmit={createGroup}
        >
          <h1> Create a new group</h1>
          <div className="">
            <label htmlFor="groupname">Group Name:</label>
            <input
              className="border-2 border-gray-300 bg-white h-6 rounded-lg text-sm focus:outline-none"
              type="text"
              name="groupname"
              value={room_name}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <Search event={addMember} event_name="add to group" />
          </div>
          <div>
            <button className="bg-cyan-950 p-2 text-gray-400 rounded-md">
              Create Group
            </button>
          </div>
        </form>
        <div className="bg-gray-500 p-2 rounded-md">
          <h1 className=" border-b-2 border-gray-950 text-gray-200 font-bold capitalize">
            Current Group Members
          </h1>

          <ul className="rounded-md bg-gray-800 text-white max-h-52 w-[100%] max-w-64 overflow-y-scroll scrollbar">
            {members.map((member) => (
              <li
                className="border-b-2 border-cyan-950 text-gray-400 font-bold"
                key={member}
              >
                {member}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CreateGroupForm;
