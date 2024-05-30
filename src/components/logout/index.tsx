import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../util/api";
import ErrorMessage from "../error-message";

function Logout() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  //Sends you back to the home page on log out
  const handleLogout = async () => {
    try {
      await Api.logout();
      navigate("/login");
    } catch (e) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <ErrorMessage message={errorMessage} />
      <button
      onClick={handleLogout}
      className="mt-4 bg-red-500 text-white p-2 rounded"
      >
       Logout
      </button>
    </>
  );
}

export default Logout;
