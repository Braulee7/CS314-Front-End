import { useState, useEffect } from "react";
import Api from "../api";

export default function useUsers(
  user: Api
): [string, React.Dispatch<React.SetStateAction<string>>, string[]] {
  const [users, setUsers] = useState<string[]>([]);
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
        setUsers(data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [username]);

  return [username, setUsername, users];
}
