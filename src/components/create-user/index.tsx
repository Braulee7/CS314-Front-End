import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../util/api";
import ErrorMessage from "../error-message";

interface UserCredentials {
  username: string;
  password: string;
  confirm_password: string;
}

function CreateUserForm() {
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  // send request to server to create user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent default form submission
    event.preventDefault();

    // validate password and confirm password
    if (credentials.password !== credentials.confirm_password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // send request to server to create user
    try {
      await Api.CreateUser(credentials.username, credentials.password);
      // clear error message
      setErrorMessage("");
      // redirect to home page and sign user in
      navigate("/");
    } catch (error) {
      // cast the error to correct type since catch needs
      // to be of type any
      const e = error as Error;
      setErrorMessage(e.message);
      return;
    }
  };

  return (
    <div className=" min-h-[100%] bg-gray-300 flex justify-center items-start">
      <div className="bg-white p-20 rounded shadow-md w-110">
        <h1 className="text-2xl font-bold mb-4">Create a new account</h1>
        <form id="create-user-form" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              data-testid="username-input"
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full border"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              data-testid="password-input"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full border"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="confirm-password" className="block mb-1">
              Confirm Password:
            </label>
            <input
              data-testid="confirm-password-input"
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={credentials.confirm_password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirm_password: e.target.value,
                })
              }
              className="w-full border"
              required
            />
          </div>
          <button
            data-testid="submit-button"
            type="submit"
            className="w-full text-lg rounded border hover:bg-blue-300"
          >
            Create Account
          </button>
        </form>
        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
}

export default CreateUserForm;
