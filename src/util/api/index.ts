import { JwtPayload, jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

// interface of what a user has
// currently is just a username
export interface UserObj {
  username: string;
}

// interface of what the backend
// returns for a room
export interface RoomObj {
  room_id: number;
  room_name: string;
}
export interface MessageObj {
  message_id: number;
  message: string;
  date_sent: string;
  sending_user: string;
}

// interace for data held by our API class
interface ApiObj {
  username: string;
  accessToken: string;
}

interface RoomLoaderParams {
  roomId?: string;
}

// SINGLETON CLASS
// API class will handle all fetching for the user. It will
// contain the authenticating information (usrname and JWT access
// token) and will be used to make all requests to the backend.

class Api {
  // save the username of the user and
  // any authentication tokens that are needed
  private constructor(username: string, token: string) {
    this._username = username;
    this._accessToken = token;
  }

  // attempts to log in the user and returns the instance of
  // api if successful, throws an error otherwise
  // @param username {string}: the username of the user
  // @param password {string}: the password of the user
  // @return {Api}: the instance of the api
  public static async Login(username: string, password: string): Promise<Api> {
    const user = { username: username, password: password };
    // POST request to the backend
    const response = await fetch("http://localhost:3333/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    // Check status of response
    if (response.ok) {
      // see what the cookies were set to
      const json = await response.json();
      this._instance = new Api(json.username, json.accessToken);
      return this._instance;
    } else {
      // propagate the correct error message on failure
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
  // @param username {string}: the username of the user
  // @param password {string}: the password of the user
  // @return {Api}: the instance of the api
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
      credentials: "include",
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
  // @return {Promis<API>} the instance of the api
  public static async Refresh(): Promise<Api> {
    // get the token and username
    const { username, accessToken } = await Api.RefreshToken();
    // create a new instance of api
    this._instance = new Api(username, accessToken);
    return this._instance;
  }

  // searches the database for any users with the prefix
  // of the passed in username and returns a list of users
  // @param username {string}: the prefix of the username to search for
  // @return {Promise<UserObj[]>}: the list of users retrieved
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

  public async memberOfRoom(room_id: number): Promise<boolean> {
    const url = `http://localhost:3333/room/members?room_id=${room_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.AccessToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.includes(this._username);
    } else {
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

  public async createDirectMessageRoom(other_user: string): Promise<number> {
    const url = "http://localhost:3333/room";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.AccessToken,
      },
      body: JSON.stringify({ other_user: other_user }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.room_id;
    } else {
      switch (response.status) {
        case 406:
          throw new Error("Unauthorised user please log back in");
        case 500:
          throw new Error("Internal server error, please try again later");
        default:
          throw new Error("An unknown error occurred");
      }
    }
  }

  public async getAllRooms(): Promise<RoomObj[]> {
    const response = await fetch("http://localhost:3333/room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.AccessToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      switch (response.status) {
        case 406:
          throw new Error("Unauthorised user please log back in");
        case 500:
          throw new Error("Internal server error, please try again later");
        default:
          throw new Error("An unknown error occurred");
      }
    }
  }

  // checks if a room exists between the current logged in user and the other user
  // @param other_user {string}: the other user to check if a room exists
  // @return {Promise<number>}: the room id if it exists, -1 otherwise
  public async CheckRoomExists(other_user: string): Promise<number> {
    // set up url
    const url = `http://localhost:3333/room/exists?user1=${this._username}&user2=${other_user}`;
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

  public async sendMessage(
    room_id: number,
    message: string
  ): Promise<MessageObj> {
    const url = "http://localhost:3333/message";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.AccessToken,
      },
      body: JSON.stringify({ room_id: room_id, message: message }),
    });
    // resolve promise
    if (response.ok) {
      const message_obj = await response.json();
      return message_obj;
    }
    switch (response.status) {
      case 400:
        throw new Error("Request failed, please try again later");
      case 500:
        throw new Error("Internal server error, please try again later");
      default:
        throw new Error("An unknown error occurred");
    }
  }

  public async getMessages(room_id: number): Promise<MessageObj[]> {
    const url = `http://localhost:3333/message?room_id=${room_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.AccessToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.messages;
    } else {
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

  // getter function to retrieve the username of the currently
  // logged in user
  // @return {string}: the username of the user
  public get username(): string {
    return this._username;
  }

  // getter function to retrieve the instance of the currently
  // logged in user API.
  // @return {Api | null}: the instance of the user API if a user is
  //  logged in, null otherwise
  public static get User(): Api | null {
    return this._instance;
  }

  // static function to refresh the access token by making a
  // a request to the backend with our cookies credentials
  // @return {Promise<ApiObj>}: the new access token and username
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
  // @return {string}: a valid access token
  public get AccessToken(): string {
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

  // Starts a logout request to the server, and invalidates the current instance
  // @return {Promise<void>}: To identify when it is done.
  public static async logout(): Promise<void> {
    const response = await fetch("http://localhost:3333/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    this._instance = null;
  }

  public async deleteRoom(roomId: number): Promise<void> {
    const url = `http://localhost:3333/rooms/${roomId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete the room: ${errorText}`);
    }
  }

  // DATA MEMBERS
  // static instance of the user, the singleton
  //In order to be set to null, api needs to be able to be type null.
  private static _instance: Api | null = null;
  // username and access token of the user
  private _username: string;
  private _accessToken: string;

}

// loader to check if a user is logged in
export async function authenticateUserLoader() {
  // get the instance of the user
  let user = Api.User;
  if (!user) {
    // attempt to get new tokens via refresh token in cookies
    try {
      user = await Api.Refresh();
    } catch (e) {
      console.error(e);
      return redirect("/login");
    }
  }
  return { user };
}

export async function getRoomLoader({ params }: { params: RoomLoaderParams }) {
  const result = await authenticateUserLoader();
  if (result instanceof Response) {
    return result;
  }
  const { user } = result;
  // get the room id from the param
  const room_id: number | undefined = params.roomId
    ? parseInt(params.roomId, 10)
    : undefined;
  if (!room_id) {
    return redirect("/");
  }

  // verify that the user is a member of this room
  try {
    const is_member = await user.memberOfRoom(room_id);
    if (!is_member) {
      return redirect("/");
    }

    return [user, params.roomId];
  } catch (e) {
    return redirect("/");
  }
}



export default Api;
