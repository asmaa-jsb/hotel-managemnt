import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../redux/store";


const ProtectedRoute = () => {
  const loginData = useSelector((state: RootState) => state.auth.loginData);

  return loginData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
