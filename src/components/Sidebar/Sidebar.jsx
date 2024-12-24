import React from "react";
import { Link } from "react-router-dom";
import { Box, Divider, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => (
  <Box
    sx={{
      width: 248,
      height: "100%",
      backgroundColor: "#f4f4f4",
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      p: 2,
    }}
  >
    <Box
      component="img"
      src="C:\Users\Adithya\OneDrive\Desktop\Fullstack React\fullstack-assesment\public\logo.jpeg"
      alt="Logo"
      sx={{
        width: "100%",
        maxWidth: 150,
        margin: "0 auto",
        mb: 2,
        borderRadius: "50%", // Optional: Makes the logo circular
      }}
    />
    <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
      MyApp
    </Typography>
    <Divider />
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/students">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
      <ListItem button component={Link} to="/help">
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>
      <ListItem button component={Link} to="/settings">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
