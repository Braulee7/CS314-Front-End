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
  try {
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
      return data.userid;
    } else {
      // propogate the correct error message on failure
      switch (response.status) {
        case 400:
          throw new Error("Username or Password is invalid");
        case 500:
          throw new Error("Internal server error, please try again later");
        default:
          throw new Error("An unknown error occurred");
      }
    }
  } catch (error) {
    throw new Error("An unknown error occurred");
  }
}
