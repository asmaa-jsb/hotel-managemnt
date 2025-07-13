import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  btnTitle?: string;
  description?: string;
  linkTo?: string;
  showBtn: boolean;
  onClickBtn?: () => void;
}

const Header = ({ title, btnTitle, description, linkTo,showBtn ,onClickBtn }: HeaderProps) => {
 
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
          {linkTo ? (
          <Link to={linkTo} className="header-link-button">
            {btnTitle}
          </Link>
        ) : onClickBtn ? (
          <Button
            onClick={onClickBtn}
            variant="contained"
            className="header-link-button"
          >
            {btnTitle}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default Header;
