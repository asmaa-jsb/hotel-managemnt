import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Login,
  ResetPassword,
  Register,
  NotFound,
  ChangePassword,
} from "./pages/index";
import AuthLayout from "./components/AuthLayout";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "./redux/slices/authSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

import RoomList from "./pages/Admin Portal/Room/Components/RoomList/RoomList";
import PortalMainLayout from "./components/AdminPortalLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveLoginData());

    const handleStorage = () => {
      dispatch(saveLoginData());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch]);

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
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <PortalMainLayout />,
          children: [{ path: "rooms", element: <RoomList /> }],
        },
      ],
    },

    // { path: "/home-page", element: <HomePage /> },
  ]);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
