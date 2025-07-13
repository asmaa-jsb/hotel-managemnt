import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { notFoundImage } from "@/assets/Images";
import "@/styles/NotFound.css"

const NotFound = () => {
  return (
   <Box className="Container">
    <img className="notFoundImg" src={notFoundImage} alt="not found image" />
      <Typography   className="Notfound-title" component="h1">404 Not Found</Typography>
      <Typography  component="p" className="Notfound-subtitle">The page you are looking for does not exist.</Typography>
      <Link  className="back-btn" to={"/dashboard"}>
        Go back to Home
      </Link>
    </Box>
  );
};

export default NotFound;
