import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as userLoader } from "./api";
import Home from "./components/home";
import Login from "./components/login";
import ChatRoom from "./components/chat-room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: userLoader,
    children: [
      {
        loader: userLoader,
        path: "rooms/:roomId",
        element: <ChatRoom />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
