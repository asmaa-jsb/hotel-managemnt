import React from "react";
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
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import ReusableButton from "../ReusableButton/ReusableButton";
import { useUserProfile } from "@/utils/Hooks/Hooks";

const pagesForUser = ["Home", "Explore", "Reviews", "Favorites"];
const pagesForUserForAnonymous = ["Home", "Explore"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

  const handleMenuClick = (option: string) => {
    handleCloseUserMenu();
    if (option === "Logout") {
        
    } else {
      // navigate to profile/settings etc.
    }
  };

  const userId = LoginData?._id;
  const { data, isLoading } = useUserProfile(userId || "");
  const user = data?.data?.user;

  const displayName = user?.userName || "Guest";
  const avatarSrc = user?.profileImage || "https://i.pravatar.cc/40";

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "2px solid #e5e5e5", backgroundColor: "#fff", py: 1 }}
    >
      <Container maxWidth="xl" sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Left Burger Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Centered Logo for xs */}
          <Box
            sx={{
              position: { xs: "absolute", md: "static" },
              left: 0,
              right: 0,
              top: 10,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
                color: "black",
                fontSize: { xs: "22px", md: "25px" },
                pointerEvents: "auto",
              }}
            >
              <Box component="span" className="Primary-color">Sta</Box>ycation
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            {!LoginData && (
              <>
                <MenuItem>
                  <Button fullWidth sx={{ color: "#203FC7", border: "1px solid #203FC7" }}>Login</Button>
                </MenuItem>
                <MenuItem>
                  <Button fullWidth sx={{ backgroundColor: "#203FC7", color: "white" }}>Register</Button>
                </MenuItem>
              </>
            )}
          </Menu>

          {/* Right section for md+ */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "17px",
                  display: { xs: "none", md: "inline-flex" },
                  "&:hover": { color: "#203FC7" },
                }}
              >
                {page}
              </Button>
            ))}

            {!LoginData && (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <ReusableButton label="Register" to="/auth/register" />
                <ReusableButton label="Login Now" to="/auth/login" />
              </Box>
            )}

            {LoginData && (
              <Box sx={{ position: "relative" }}>
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.2,
                    py: 0.5,
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <Avatar alt={displayName} src={avatarSrc} sx={{ width: 30, height: 30 }} />
                  <Typography fontSize={13} fontWeight={600} sx={{ display: { xs: "none", sm: "block" } }}>{displayName}</Typography>
                </Box>

                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      minWidth: 150,
                      width: 150,
                      mt: 0.8,
                      p: 1,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} px={1} py={0.8}>
                    <Avatar
                      alt={displayName}
                      src={avatarSrc}
                      sx={{ width: 28, height: 28, border: "2px solid #203FC7" }}
                    />
                    <Box>
                      <Typography fontWeight={600} fontSize={13}>{displayName}</Typography>
                      <Typography variant="caption" color="text.secondary">@{user?.userName || "username"}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem onClick={() => handleMenuClick("Profile")} sx={{ fontSize: 13, py: 0.8 }}>My Profile</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("Logout")} sx={{ fontSize: 13, py: 0.8, color: "#F44336" }}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
