import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

function Home() {
  return (
    <div className="flex justify-between">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Home;
