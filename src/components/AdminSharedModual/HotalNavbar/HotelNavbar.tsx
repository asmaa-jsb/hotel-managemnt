import React from 'react';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useUserProfile } from '@/utils/Hooks/Hooks';
import { clearLoginData } from '@/redux/slices/authSlice';
import CookieServices from '@/services/CookieServices/CookieServices';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '@/interfaces/Interfaces';

// AppBar مخصص بدون بادينغ عمودي
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f8f9fb',
  boxShadow: 'none',
    paddingLeft: theme.spacing(3), 
  paddingRight: theme.spacing(3), 
  minHeight: 0,
   borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: theme.palette.mode === 'dark' ? '#2b2b2b' : '#fff',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
  width: '100%',
  maxWidth: 500,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: '10px',
  color: theme.palette.text.primary,
}));


  
const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const loginData = useSelector((state: RootState) => state.auth.loginData);
   const userId: string |undefined = loginData?._id;
  
  const { data, isLoading, isError } = useUserProfile<UserProfile>(userId);
 const user = data?.data?.user;
    
    // Handle Logout
  const handleLogout = () => {
    dispatch(clearLoginData()); 
    CookieServices.remove('token'); 
    handleUserMenuClose(); 
    navigate("/login")
  };
   
   

 
  // User menu
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  // Notifications menu
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const handleNotifOpen = (e: React.MouseEvent<HTMLElement>) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

 const displayName = user?.userName || 'Guest';
  const avatarSrc = user?.profileImage || "https://i.pravatar.cc/40";

  return (
    <>
      <CustomAppBar position="static" >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent : {xs:'end',md: "space-between", lg:'space-between'},
            minHeight: 0,
            paddingY: 0,
          }}
        >
          {/* Search */}
          {!isMobile && (
            <SearchContainer>
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
              <StyledInput placeholder="Search Here" />
            </SearchContainer>
          )}

          {/* Right section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Notifications */}
            <IconButton onClick={handleNotifOpen}>
              <Badge color="error" variant="dot">
                <NotificationsNoneIcon sx={{ color: theme.palette.text.primary }} />
              </Badge>
            </IconButton>

            {/* Avatar + Username */}
            <Box
              onClick={handleUserMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#fff',
                p: 1,
                borderRadius: '12px',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Avatar
                alt="User"
                src={avatarSrc}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Typography variant="body2" color={theme.palette.text.primary}>
               {displayName}
              </Typography>
              <ArrowDropDownIcon sx={{ color: theme.palette.text.primary }} />
            </Box>
          </Box>
        </Toolbar>
      </CustomAppBar>

      {/* User dropdown menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={()=>navigate("/my-profile")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Notifications dropdown menu */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>New comment on your post</MenuItem>
        <MenuItem>New user registered</MenuItem>
        <MenuItem>Server backup completed</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
