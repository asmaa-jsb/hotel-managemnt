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
}

const Header = ({
  title,
  btnTitle,
  description,
  linkTo,
  showBtn,
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
        width: "89%",
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

        {showBtn && linkTo && (
          <Link to={linkTo} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              {btnTitle}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
