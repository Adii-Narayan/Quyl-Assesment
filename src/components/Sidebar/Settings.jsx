// src/components/Sidebar/Settings.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Settings</Typography>
      <Typography variant="body1">
        This is the settings section where you can adjust your preferences.
      </Typography>
    </Box>
  );
};

export default Settings;
