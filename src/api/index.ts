import { JwtPayload, jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

export interface UserObj {
  username: string;
}

interface ApiObj {
  username: string;
  accessToken: string;
}

class Api {
  // save the username of the user and
  // any authentication tokens that are needed
  private constructor(username: string, token: string) {
    this._username = username;
    this._accessToken = token;
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
      const json = await response.json();
      this._instance = new Api(json.username, json.accessToken);
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
      this._instance = new Api(data.userid, data.accessToken);
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

  // attempts to get new credentials using refresh token
  // returns the instance of api if successful, throws an error otherwise
  public static async Refresh(): Promise<Api> {
    // get the token and username
    const { username, accessToken } = await Api.RefreshToken();
    // create a new instance of api
    this._instance = new Api(username, accessToken);
    return this._instance;
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
        Authorization: "Bearer " + this.AccessToken,
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
        Authorization: "Bearer " + this.AccessToken,
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

  private static async RefreshToken(): Promise<ApiObj> {
    const response = await fetch("http://localhost:3333/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // check status
    if (response.ok) {
      // return new token and username
      const json = await response.json();
      return json;
    } else {
      switch (response.status) {
        case 406:
          throw new Error("Unauthorized, please log in again");
        default:
          throw new Error("An unknown error occurred");
      }
    }
  }

  // checks if the access token is expired and returns a valid token
  private get AccessToken(): string {
    // check expiration
    const decoded_token: JwtPayload = jwtDecode(this._accessToken);
    const expiration_date =
      decoded_token.exp === undefined ? -1 : decoded_token.exp * 1000; // convert to milliseconds
    const current_date = Date.now();

    if (current_date > expiration_date) {
      // refresh token
      Api.RefreshToken().then((api_obj) => {
        this._accessToken = api_obj.accessToken;
      });
    }

    return this._accessToken;
  }

  private static _instance: Api;
  private _username: string;
  private _accessToken: string;
}

// loader to check if a user is logged in
export function loader() {
  let user = Api.User;
  if (!user) {
    // attempt to get new tokens via refresh token in cookies
    try {
      Api.Refresh().then((api) => {
        user = api;
      });
    } catch (e) {
      // unauthorized, redirect to login
      return redirect("/login");
    }
  }
  return { user };
}

export default Api;
