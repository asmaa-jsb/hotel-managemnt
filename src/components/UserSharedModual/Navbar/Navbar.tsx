import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import ReusableButton from "../ReusableButton/ReusableButton";

const pagesForUser = ["Home", "Explore", "Reviews", "Favorites"];
const pagesForUserForAnonymous = ["Home", "Explore"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const LoginData = useSelector((state: RootState) => state.auth.loginData);
  const pages = LoginData ? pagesForUser : pagesForUserForAnonymous;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "2px solid rgba(229, 229, 229, 1)",
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
              flexGrow: 8,
              color: "black",
              fontSize: "25px",
            }}
          >
            <Box component="span" className="Primary-color">
              Sta
            </Box>
            ycation
          </Typography>

          {/* Burger Menu - Small Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      "&:hover": {
                        color: "#203FC7",
                        background: "transparent",
                      },
                      "&:active": {
                        color: "#1565c0",
                        background: "transparent",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}

              {/* Buttons for Anonymous User (Mobile) */}
              {!LoginData && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button
                      fullWidth
                      sx={{
                        color: "#203FC7",
                        border: "1px solid #203FC7",
                        textTransform: "none",
                      }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button
                      fullWidth
                      sx={{
                        color: "white",
                        backgroundColor: "#203FC7",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#1565c0" },
                      }}
                    >
                      Register
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Logo - Small Screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "black",
            }}
          >
            <Box component="span" className="Primary-color">
              Sta
            </Box>
            ycation
          </Typography>

          {/* Nav Links + Buttons - Large Screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  textTransform: "none",
                  fontSize: "17px",
                  "&:hover": { color: "#203FC7", background: "transparent" },
                  "&:active": { color: "#1565c0", background: "transparent" },
                }}
              >
                {page}
              </Button>
            ))}

            {!LoginData && (
              <>
                <ReusableButton label="Register" />
                <ReusableButton label="Login Now" />
              </>
            )}
          </Box>
          {LoginData && (
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
