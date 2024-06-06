import { useState, useEffect } from "react";
import Api, { UserObj } from "../util/api";

export default function useUsers(
  user: Api
): [string, React.Dispatch<React.SetStateAction<string>>, UserObj[]] {
  const [users, setUsers] = useState<UserObj[]>([]);
  const [username, setUsername] = useState("");
  const user_api = user;

  useEffect(() => {
    // clear the users list
    if (!username) {
      setUsers([]);
      return;
    }
    try {
      user_api.SearchForUsers(username).then((data) => {
        // make sure the logged in user can't message themselves
        const users = data.filter((user) => user.username != user_api.username);
        setUsers(users);
      });
    } catch (e) {
      console.log(e);
    }
  }, [username, user_api]);

  return [username, setUsername, users];
}
