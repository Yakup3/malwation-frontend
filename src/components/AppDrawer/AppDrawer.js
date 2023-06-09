import React, { useState } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
  ListItemText,
  Button,
} from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../auth/authService";
import AlertDialog from "../AlertDialog/AlertDialog";
import { ROUTE_NAMES, ROUTE_PATHS } from "../../shared.constants";

const AppDrawer = () => {
  const navigate = useNavigate();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Drawer variant="permanent">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" style={{ padding: "16px" }}>
            MALWATION
          </Typography>
          <List>
            <ListItem
              button
              component={Link}
              to={ROUTE_PATHS.USER_LIST}
              sx={{
                backgroundColor:
                  window.location.pathname === ROUTE_PATHS.USER_LIST
                    ? "#f0f0f0"
                    : "transparent",
              }}
            >
              <ListItemText primary={ROUTE_NAMES.USER_LIST} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={ROUTE_PATHS.EVENTS}
              sx={{
                backgroundColor:
                  window.location.pathname === ROUTE_PATHS.EVENTS
                    ? "#f0f0f0"
                    : "transparent",
              }}
            >
              <ListItemText primary={ROUTE_NAMES.EVENTS} />
            </ListItem>
          </List>
        </div>
        <Divider />
        <div style={{ padding: "18px" }}>
          <Button onClick={handleLogoutDialogOpen}>
            <FiLogOut
              style={{
                marginRight: "8px",
              }}
            />
            Logout
          </Button>
        </div>
      </div>

      <AlertDialog
        title="Logout"
        message="Are you sure you want to logout?"
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        onConfirm={handleLogout}
      />
    </Drawer>
  );
};

export default AppDrawer;
