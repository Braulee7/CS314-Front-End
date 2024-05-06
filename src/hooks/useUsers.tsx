import { useState, useEffect } from "react";
import { SearchForUsers } from "../api/user";

export default function useUsers() {
  const [users, setUsers] = useState<string[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // clear the users list
    if (!username) {
      setUsers([]);
      return;
    }
    try {
      SearchForUsers(username).then((data) => {
        setUsers(data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [username]);

  return [username, setUsername, users];
}
