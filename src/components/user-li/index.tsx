interface UserLiProps {
  user: string;
  method: (username: string) => void;
  method_name: string;
}

function UserLi(props: UserLiProps) {
  return (
    <li className="flex justify-between w-48 bg-gradient-to-r from-blue-700 to-indigo-600 bg-opacity-75 m-2 rounded-lg border-stone-400 border-2">
      <h1 className="font-bold">{props.user}</h1>
      <button
        className=" bg-fuchsia-400 m-1 p-1 capitalize rounded-md hover:bg-fuchsia-500 hover:text-white"
        onClick={() => {
          props.method(props.user);
        }}
      >
        {props.method_name}
      </button>
    </li>
  );
}

export default UserLi;
