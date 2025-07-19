import React, { useState } from "react";
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
  Select,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import ReusableButton from "../ReusableButton/ReusableButton";
import { useUserProfile } from "@/utils/Hooks/Hooks";
import { HandleLogout } from "@/utils/HelperFunctions/HelperFunctions";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SelectChangeEvent } from "@mui/material/Select";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { t, i18n } = useTranslation();

  const LoginData = useSelector((state: RootState) => state.auth.loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem("lang");
    return stored === "ar" || stored === "en" ? stored : "en";
  });

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang);
    window.location.reload(); // Apply RTL theme
  };

  const pagesForUser = [
    { name: "home", labelKey: "home", path: "/" },
    { name: "explore", labelKey: "explore", path: "/explore" },
    { name: "reviews", labelKey: "reviews", path: "/reviews" },
    { name: "favorites", labelKey: "favorites", path: "/favorites" },
  ];

  const pagesForUserForAnonymous = [
    { name: "home", labelKey: "home", path: "/" },
    { name: "explore", labelKey: "explore", path: "/explore" },
  ];

  const pages = LoginData ? pagesForUser : pagesForUserForAnonymous;

  const userId = LoginData?._id;
  const { data } = useUserProfile(userId || "");
  const user = data?.data?.user;
    console.log("rrrrrrrrrrrr",t("home"))

  const displayName = user?.userName || "Guest";
  const avatarSrc = user?.profileImage || "https://i.pravatar.cc/40";

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
    if (option === "logout") {
      HandleLogout(dispatch, navigate);
    } else {
      navigate(`/admin/my-profile/${userId}`);
    }
  };

  const handleNavClick = (page: { name: string; labelKey: string; path: string }) => {
    handleCloseNavMenu();
    if (page.name === "reviews") {
      navigate("/", { state: { scrollTo: "reviews" } });
    } else if (page.name === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else {
      navigate(page.path);
    }
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "2px solid #e5e5e5", backgroundColor: "#fff", py: 1 }}
    >
      <Container maxWidth="xl" sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Centered Logo */}
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

          {/* Mobile Menu Drawer */}
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={() => handleNavClick(page)}>
              
                <Typography textAlign="center">{t(page.labelKey)}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Desktop Nav & Language Switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              size="small"
              sx={{
                minWidth: 110,
                fontSize: "0.875rem",
                borderRadius: 2,
                height: "36px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>

            {pages.map((page) => {
              const isActive =
                (page.name === "home" && location.pathname === "/" && !location.state?.scrollTo) ||
                (page.name === "reviews" && location.pathname === "/" && location.state?.scrollTo === "reviews") ||
                (location.pathname === page.path && page.name !== "reviews");

              return (
                <Button
                  key={page.name}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    color: isActive ? "#203FC7" : "black",
                    fontWeight: isActive ? 600 : 400,
                    textTransform: "none",
                    fontSize: "17px",
                    display: { xs: "none", md: "inline-flex" },
                    borderBottom: isActive ? "2px solid #203FC7" : "none",
                    borderRadius: 0,
                  }}
                >
                  {t(page.labelKey)}
                </Button>
              );
            })}

            {!LoginData && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <ReusableButton label={t("register")} to="/auth/register" />
                <ReusableButton label={t("login_now")} to="/auth/login" />
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
                  <Typography fontSize={13} fontWeight={600} sx={{ display: { xs: "none", sm: "block" } }}>
                    {displayName}
                  </Typography>
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
                      <Typography variant="caption" color="text.secondary">
                        @{user?.userName || "username"}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem onClick={() => handleMenuClick("profile")} sx={{ fontSize: 13, py: 0.8 }}>
                    {t("my_profile")}
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("logout")} sx={{ fontSize: 13, py: 0.8, color: "#F44336" }}>
                    {t("logout")}
                  </MenuItem>
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
