import { redirect } from "react-router-dom";

export interface UserObj {
  username: string;
}

class Api {
  // save the username of the user and
  // any authentication tokens that are needed
  private constructor(username: string) {
    this._username = username;
  }

  // attempts to log in the user and returns the instance of
  // api if successful, throws an error otherwise
  public static async Login(username: string, password: string): Promise<Api> {
    const user = { username: username, password: password };
    // POST request to the backend
    const response = await fetch("http://localhost:3333/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Check status of response
    if (response.ok) {
      this._instance = new Api(username);
      return this._instance;
    } else {
      // propogate the correct error message on failure
      console.log(response.status);
      switch (response.status) {
        case 401:
          throw new Error(
            "Username or password is incorrect, please try again"
          );
        case 404:
          throw new Error("User not found, please try again");
        case 500:
          throw new Error("Internal server error, please try again later");
        default:
          throw new Error("An unknown error occurred");
      }
    }
  }

  // attempts to create a new user and log them in if successful
  //returns the instance of api if successful, throws an error otherwise
  public static async CreateUser(
    username: string,
    password: string
  ): Promise<Api> {
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
      this._instance = new Api(data.userid);
      return this._instance;
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

  // searches the database for any users with the prefix
  // of the passed in username and returns a list of users
  public async SearchForUsers(username: string): Promise<UserObj[]> {
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

  // checks if a room exists between the current logged in user and the other user
  public async CheckRoomExists(other_user: string): Promise<number> {
    // set up url
    const url = `http://localhost:3333/room?user1=${this._username}&user2=${other_user}`;
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
      return data.room_id;
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

  public get username(): string {
    return this._username;
  }

  public static get User(): Api | null {
    if (!this._instance) {
      return null;
    }
    return this._instance;
  }

  private static _instance: Api;
  private _username: string;
}

// loader to check if a user is logged in
export function loader() {
  const user = Api.User;
  if (!user) {
    return redirect("/login");
  }
  return { user };
}

export default Api;
