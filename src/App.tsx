import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  ForgetPassword,
  ResetPassword,
  Register,
  NotFound,
} from "./pages/index";
import AuthLayout from "./components/AuthLayout";

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
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },
  ]);
  return (
   
      <RouterProvider router={routes} />
   
  );
}

export default App;
