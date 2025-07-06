import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Home,
  People,
  MeetingRoom,
  CalendarToday,
  Lock,
  Logout,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Home", icon: <Home />, path: "/home" },
  { label: "Users", icon: <People />, path: "/users" },
  { label: "Rooms", icon: <MeetingRoom />, path: "/rooms" },
  { label: "Ads", icon: <CalendarToday />, path: "/ads" },
  { label: "Bookings", icon: <People />, path: "/bookings" },
  { label: "Change password", icon: <Lock />, path: "/change-password" },
  { label: "Logout", icon: <Logout />, path: "/logout" },
];

const drawerWidth = 240;
const collapsedWidth = 50;

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          backgroundColor: "#2645c7",
          color: "#fff",
          transition: "width 0.3s",
        },
      }}
    >
      <Box display="flex" justifyContent="end" py={1}>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "#fff" }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            <Tooltip title={!open ? item.label : ""} placement="right">
              <ListItem
                button
                sx={{
                  px: open ? 2 : 1,
                  py: 1.5,
                  transition: "padding 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItem>
            </Tooltip>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
