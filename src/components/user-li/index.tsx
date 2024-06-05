interface UserLiProps {
  user: string;
  method: (username: string) => void;
  method_name: string;
}

function UserLi(props: UserLiProps) {
  return (
    <li className="flex justify-between w-48 bg-gradient-to-r from-cyan-700 to-gray-600 bg-opacity-75 m-2 rounded-lg border-stone-400 border-2">
      <h1 className="font-bold">{props.user}</h1>
      <button
        className=" bg-gray-800 m-1 p-1 capitalize rounded-md hover:bg-gray-500 text-white"
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          props.method(props.user);
        }}
      >
        {props.method_name}
      </button>
    </li>
  );
}

export default UserLi;
