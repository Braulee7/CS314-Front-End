import { useState } from "react";
import Login from "../login";
import CreateUserForm from "../create-user";

function SignInPage() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col content-between p-2 bg-gray-300">
      {showLogin ? <Login /> : <CreateUserForm />}

      <button
        className="p-2 bg-cyan-950 rounded-md text-white hover:bg-cyan-900 w-1/4 self-center"
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );
}

export default SignInPage;
