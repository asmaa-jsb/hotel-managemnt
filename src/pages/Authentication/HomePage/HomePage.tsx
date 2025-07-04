import { Button } from "@mui/material";
import CookieServices from "../../services/CookieServices/CookieServices";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const name = CookieServices.get("token");
  console.log("first ", name);
  const navigate = useNavigate();
  const handleLogOut = () => {
    CookieServices.remove("token");
    navigate("/login");
  };
  return (
    <>
      <div>HomePage</div>
      <Button
        type="submit"
        className="submit-btn"
        fullWidth
        variant="outlined"
        onClick={() => handleLogOut()}
      >
        Log out
      </Button>
    </>
  );
};

export default HomePage;
