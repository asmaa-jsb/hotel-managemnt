import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Login,
  ResetPassword,
  Register,
  RoomList,
  AdsList,
  Dashboard,
  FacilitiesList,
  BookingList,
  Users,
  NotFound,
  Profile,
  ForgetPassword,
} from "./pages/index";
import AuthLayout from "./components/AdminSharedModual/AuthLayout/AuthLayout";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "./redux/slices/authSlice";
import { useEffect } from "react";
// import ProtectedRoute from "./components/ProtectedRoute";
//  path: "/",
//       element: <ProtectedRoute />,
import PortalMainLayout from "./components/AdminSharedModual/AdminPortalLayout/AdminPortalLayout";
import RoomForm from "./pages/AdminPortal/Room/Components/RoomForm/RoomForm";
import { Loader } from "./components/AdminSharedModual/Loader/Loader";
import AdsForm from "./pages/AdminPortal/Ads/Components/AdsForm/AdsForm";
import ChangePassword from "./pages/Authentication/ChangePassword/ChangePassword";


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
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      children: [
        {
          element: <PortalMainLayout />,
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
      ],
    },
    {
      path: "loader",
      element: <Loader />,
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
