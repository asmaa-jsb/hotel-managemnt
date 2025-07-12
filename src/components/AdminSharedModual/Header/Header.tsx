import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  btnTitle?: string;
  description?: string;
  linkTo?: string;
  showBtn: boolean;
}

const Header = ({
  title,
  btnTitle,
  description,
  linkTo,
  showBtn,
}: HeaderProps) => {
  return (
    <Box className="header-container">
      <Box className="header-content">
        <Box className="header-text">
          <Typography variant="h5" className="Primary-color">
            {title}
          </Typography>
          <Typography variant="body1">
            {description || "You can check all details"}
          </Typography>
        </Box>
        {linkTo && (
          <Link to={linkTo} className="header-link-button">
            {btnTitle}
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
