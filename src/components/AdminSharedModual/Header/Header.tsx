import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  btnTitle?: string;
  description?: string;
  linkTo?: string;
  showBtn: boolean;
  onClickBtn?: () => void;
}

const Header = ({
  title,
  btnTitle,
  description,
  linkTo,
  showBtn,
  onClickBtn
}: HeaderProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className="Header-bg"
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 3, sm: 4 },
        mb: 4,
        width:{ md:"89%", xs:"82%"},
        ml: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isSmallScreen ? "flex-start" : "center",
          gap: 2,
          maxWidth: "100%", 
        }}
      >
        <Box>
          <Typography variant="h5" className="Primary-color" sx={{ mb: 0.5 }}>
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
