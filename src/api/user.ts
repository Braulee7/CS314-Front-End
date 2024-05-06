// Creates a new user in the database
// @param username {string}: the username of the new user
// @param password {string}: the password of the new user
// @returns {string} userid of the new user
// @throws {Error} throws an appropriate error message if the request fails
export async function CreateUser(
  username: string,
  password: string
): Promise<string> {
  const user = { username: username, password: password };
  // POST request to the backend
  const response = await fetch("http://localhost:3333/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  // Check status of response
  if (response.ok) {
    // return userid if successful
    const data = await response.json();
    return data.userId;
  } else {
    // propogate the correct error message on failure
    console.log(response.status);
    switch (response.status) {
      case 400:
        throw new Error(
          "Username is already taken, try again with another username"
        );
      case 500:
        throw new Error("Internal server error, please try again later");
      default:
        throw new Error("An unknown error occurred");
    }
  }
}

// Searches for a user in the database
export async function SearchForUsers(username: string): Promise<string[]> {
  // set up the query parameters
  const url = "http://localhost:3333/user?username=" + username;
  // GET request to the backend
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // check the status of response
  if (response.ok) {
    // return list of users if successful
    const users = await response.json();
    return users;
  } else {
    // propogate the correct error message on failure
    console.log(response.status);
    switch (response.status) {
      case 400:
        throw new Error("Request failed, please try again later");
      case 500:
        throw new Error("Internal server error, please try again later");
      default:
        throw new Error("An unknown error occurred");
    }
  }
}
