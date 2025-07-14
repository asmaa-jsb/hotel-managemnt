import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  CircularProgress, 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { useUserProfile } from "@/utils/Hooks/Hooks";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { HandleLogout } from "@/utils/HelperFunctions/HelperFunctions";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f8f9fb",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: 1201,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: theme.palette.mode === "dark" ? "#2b2b2b" : "#fff",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  height: 44,
  flexGrow: 1,
  minWidth: 200,
  maxWidth: 800,
  [theme.breakpoints.down("lg")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 250,
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: "6px 0",
  color: theme.palette.text.primary,
}));

interface NavbarProps {
  setOpen: (val: boolean) => void;
  open: boolean;
}

const HotelNavbar: React.FC<NavbarProps> = ({ setOpen, open }) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginData = useSelector((state: RootState) => state.auth.loginData);
  const userId = loginData?._id;

  
  const { data, isLoading } = useUserProfile(userId || ""); 
  const user = data?.data?.user;

  const displayName = user?.userName || "Guest";
  const avatarSrc = user?.profileImage || "https://i.pravatar.cc/40";

  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setUserMenuAnchor(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const handleNotifOpen = (e: React.MouseEvent<HTMLElement>) =>
    setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <>
      <CustomAppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            {isMobileOrTablet && (
              <IconButton onClick={() => setOpen(!open)} sx={{ color: theme.palette.text.primary }}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <SearchContainer>
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
              <StyledInput placeholder="Search Here" />
            </SearchContainer>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={handleNotifOpen} sx={{ color: theme.palette.text.primary }}>
              <Badge color="error" variant="dot">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* Corrected CircularProgress size */}
            {isLoading ? (
              <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32, // Match avatar width
                  height: 32, // Match avatar height
                  p: 1, // Match padding of the avatar box
                  borderRadius: '12px',
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.mode === "dark" ? "#2c2c2c" : "#fff",
              }}>
                <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} /> 
              </Box>
            ) : (
              <Box
                onClick={handleUserMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  bgcolor: theme.palette.mode === "dark" ? "#2c2c2c" : "#fff",
                  p: 1,
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Avatar
                  alt="User"
                  src={avatarSrc}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography variant="body2" color={theme.palette.text.primary}
                  sx={{ [theme.breakpoints.down("sm")]: { display: 'none' } }} 
                >
                  {displayName}
                </Typography>
                <ArrowDropDownIcon sx={{ color: theme.palette.text.primary }} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </CustomAppBar>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      
        <MenuItem onClick={() => { navigate(`/my-profile/${userId}`); handleUserMenuClose(); }}>Profile</MenuItem>
        <MenuItem
          onClick={HandleLogout}
        >
          Logout
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleNotifClose}>New comment on your post</MenuItem>
        <MenuItem onClick={handleNotifClose}>New user registered</MenuItem>
        <MenuItem onClick={handleNotifClose}>Server backup completed</MenuItem>
      </Menu>
    </>
  );
};

export default HotelNavbar;