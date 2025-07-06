import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Login,
  ResetPassword,
  Register,
  NotFound,
  HomePage,
  ChangePassword,
} from "./pages/index";
import AuthLayout from "./components/AuthLayout";
import "./styles/global.css";
import Header from "./components/Header";
import RoomList from "./pages/Admin Portal/Room/Components/RoomList/RoomList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    // { path: "/home-page", element: <HomePage /> },
    { path: "header", element: <RoomList /> },
  ]);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
