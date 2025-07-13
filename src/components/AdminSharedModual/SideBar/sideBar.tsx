import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
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
  Build,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const menuItems = [
  { label: "Home", icon: <Home />, path: "/dashboard" },
  { label: "Users", icon: <People />, path: "/users" },
  { label: "Rooms", icon: <MeetingRoom />, path: "/rooms" },
  { label: "Ads", icon: <CalendarToday />, path: "/ads" },
  { label: "Facilities", icon: <Build />, path: "/facilities" },
  { label: "Bookings", icon: <People />, path: "/bookings" },
  { label: "Change password", icon: <Lock />, path: "/change-password" },
  { label: "Logout", icon: <Logout />, path: "/logout" },
];

const drawerWidth = 240;
const collapsedWidth = 50;

const Sidebar = ({
  open,
  setOpen,
  onLogout,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  onLogout: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!isMobile && !open) {
      setOpen(true);
    }
  }, [isMobile]);
 
  return (
    <Drawer
       
      variant={isMobile ? "persistent" : "permanent"}
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        zIndex: isMobile ? 0 : 1200,
        "& .MuiDrawer-paper": {
          top: isMobile ? "64px" : 0,
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
        {menuItems.map((item) =>
          item.label === "Logout" ? (
            <ListItem disablePadding key={item.label}>
              <ListItemButton onClick={onLogout} sx={{ px: open ? 3 : 2, py: 1.5 }}>
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
              </ListItemButton>
            </ListItem>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
            >
              <Tooltip title={!open ? item.label : ""} placement="right">
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: open ? 2 : 1, py: 1.5 }}>
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
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </NavLink>
          )
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
