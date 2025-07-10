import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Login,
  ResetPassword,
  Register,
  ChangePassword,
  RoomList,
  AdsList,
} from "./pages/index";
import AuthLayout from "./components/AuthLayout";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "./redux/slices/authSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

import PortalMainLayout from "./components/AdminPortalLayout";

import FacilitiesList from "./pages/AdminPortal/Facilities/Components/FacilitiesList/FacilitiesList";

import BookingList from "./pages/AdminPortal/BookingList/BookingList";
import Users from "./pages/AdminPortal/Users/Users";
import NotFound from "./pages/NotFound/NotFound";


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
      errorElement: <NotFound/>,
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
          children: [
            { path: "rooms", element: <RoomList /> },
            { path: "ads", element: <AdsList /> },
            { path: "facilities", element: <FacilitiesList /> },
            { path: "bookings", element: <BookingList /> },
            { path: "users", element: <Users /> },
          ],
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
