import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveLoginData } from "./redux/slices/authSlice";
import { Toaster } from "react-hot-toast";

import {
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  RoomList,
  AdsList,
  Dashboard,
  FacilitiesList,
  BookingList,
  Users,
  NotFound,
  Profile,
  RoomDetails,
  ChangePassword,
  LandingPage,
} from "./pages/index";

import PortalMainLayout from "./components/AdminSharedModual/AdminPortalLayout/AdminPortalLayout";
import AuthLayout from "./components/AdminSharedModual/AuthLayout/AuthLayout";
import UserLayout from "./components/UserSharedModual/UserPortalLayout/UserLayout";

import RoomForm from "./pages/AdminPortal/Room/Components/RoomForm/RoomForm";
import AdsForm from "./pages/AdminPortal/Ads/Components/AdsForm/AdsForm";

import "./styles/global.css";
import ExploreRoom from "./pages/UserPortal/ExploreRoom/ExploreRoom";




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
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        // { path: "adsDetails/:id", element:  },
        { path: "home", element:  <LandingPage/>},
        { path: "room-details/:id", element: <RoomDetails /> },
        { path: "ad-details/:id", element: <RoomDetails /> },
        {path:"exploreRoom" , element:<ExploreRoom/>},

        

      
      ],
    },

    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    // Admin portal after login
    {
      path: "/admin",
      element: <PortalMainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "rooms", element: <RoomList /> },
        { path: "rooms/new-room", element: <RoomForm /> },
        { path: "rooms/:roomId", element: <RoomForm /> },
        { path: "ads", element: <AdsList /> },
        { path: "ads/add", element: <AdsForm /> },
        { path: "ads/edit/:id", element: <AdsForm /> },
        { path: "facilities", element: <FacilitiesList /> },
        { path: "bookings", element: <BookingList /> },
        { path: "users", element: <Users /> },
        { path: "my-profile/:id", element: <Profile /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
