// Navbar.tsx
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
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f8f9fb',
  boxShadow: 'none',
  padding: '8px 24px',
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

  // User menu
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  // Notifications menu
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const handleNotifOpen = (e: React.MouseEvent<HTMLElement>) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <>
      <CustomAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                src="https://i.pravatar.cc/40"
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Typography variant="body2" color={theme.palette.text.primary}>
                Upskilling
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
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
