import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams() || {};
  let rightText = "Photo Sharing App";

  if (location.pathname.startsWith("/users/") && !location.pathname.includes("/photos/")) {
    const user = models.userModel(userId);
    rightText = user ? `${user.first_name} ${user.last_name}` : "User Detail";
  } else if (location.pathname.includes("/photos/")) {
    const user = models.userModel(userId);
    rightText = user ? `Photos of ${user.first_name} ${user.last_name}` : "User Photos";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Your Name Here</Typography>
        <Box>
          <Typography variant="h6">{rightText}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
