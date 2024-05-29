import { useNavigate } from "react-router-dom";
import Api from "../../util/api";

function Logout() {
  const navigate = useNavigate();
  //Sends you back to the home page on log out
  const handleLogout = async () => {
    try {
      await Api.logout();
      navigate("/login");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 bg-red-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
}

export default Logout;
