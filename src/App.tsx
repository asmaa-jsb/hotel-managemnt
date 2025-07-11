import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Login,
  ResetPassword,
  Register,
  ChangePassword,
  RoomList,
  AdsList,
  Dashboard,
  FacilitiesList,
  BookingList,
  Users,
  NotFound,
} from "./pages/index";
import AuthLayout from "./components/AuthLayout";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "./redux/slices/authSlice";
import { useEffect } from "react";
// import ProtectedRoute from "./components/ProtectedRoute";
//  path: "/",
//       element: <ProtectedRoute />,
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
     
      children: [
        {
          element: <PortalMainLayout />,
          children: [
             { index: true, element: <Dashboard /> },
              { path: "dashboard", element: <Dashboard /> },
            { path: "rooms", element: <RoomList /> },
            { path: "ads", element: <AdsList /> },
            { path: "facilities", element: <FacilitiesList /> },
            { path: "bookings", element: <BookingList /> },
            { path: "users", element: <Users /> },
          ],
        },
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
