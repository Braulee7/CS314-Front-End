import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  authenticateUserLoader as userLoader,
  getRoomLoader,
} from "./util/api";
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
        loader: getRoomLoader,
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
