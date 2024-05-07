// check if a room exists in the database
export async function checkRoomExists(other_user: string): Promise<number> {
  // get current user from the local storage
  const user = localStorage.getItem("user");
  if (!user) {
    throw new Error("Account not authorised");
  }

  // set up url
  const url = `http://localhost:3333/room?user=${user}&other_user=${other_user}`;
  // GET request to the backend
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // check the status of response
  if (response.ok) {
    // return room id
    const data = await response.json();
    return data.roomId;
  } else {
    // propogate the correct error message on failure
    console.log(response.status);
    switch (response.status) {
      case 400:
        // room does not exist return -1
        return -1;
      case 500:
        throw new Error("Internal server error, please try again later");
      default:
        throw new Error("An unknown error occurred");
    }
  }
}
