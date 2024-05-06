import useUsers from "../../hooks/useUsers";

function Search() {
  const [username, setUsername, users] = useUsers();

  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
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
        <ul className="absolute z-10 bg-blue-700 w-25 pr-10 rounded-md opacity-90 ml-5 flex flex-col justify-center">
          {users &&
            users.map((user) => (
              <>
                {/* placeholder until i create the room logic */}
                <h1
                  className="bg-gray-300 p-4 rounded-md ml-2 mr-2"
                  key={user.username}
                >
                  {user.username}
                </h1>
              </>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
