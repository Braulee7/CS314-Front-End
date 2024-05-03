import React, { useState } from "react";


interface UserCredentials {
  username: string;
  password: string;
}

//The start of commands?
// no need for any props
function Login() {

  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  //Things that check when you submit
  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    //pevents the default submission
    event.preventDefault();

    //confirm both are entered
    if (!credentials.username || !credentials.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    //try to fetch, catch if fail
    try {
      const response = await fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
    } catch (error) {
        const e = error as Error;
        setErrorMessage(e.message);
        return;
      }
  };

  //I think this is for inputs changing?
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" min-h-screen bg-gray-300 flex justify-center items-start">
        <div className="bg-white p-20 rounded shadow-md w-110">
          <h1 className="text-2xl font-bold mb-4">Login To Your Account</h1>
          <form id="loginForm">
            <div className="mb-2">
              <label htmlFor="username" className="block mb-1">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full border"
                required
              />
            </div>
            {/* Don't ask to confirm password, maybe ask later */}
            <div className="mb-2">
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full border"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-lg rounded border hover:bg-blue-300"
            >
              Login
            </button>
          </form>
          {errorMessage && (
          <div
            className="p-4 mt-4 rounded bg-red-500 border border-red-700 ease-in"
            id="errorMessage"
          >
            <p className="text-white">{errorMessage}</p>
          </div>
        )}
        </div>
      </div>
    </form>
  );
}

export default Login;
