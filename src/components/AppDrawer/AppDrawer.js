import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
  ListItemText,
} from "@mui/material";
import {
  LOCAL_STORAGE,
  ROUTE_NAMES,
  ROUTE_PATHS,
} from "../../shared.constants";
import { IoSettings } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const AppDrawer = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <Drawer variant="permanent">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" style={{ padding: "16px" }}>
            MALWATION
          </Typography>
          <List>
            <ListItem button component={Link} to={ROUTE_PATHS.USER_LIST}>
              <ListItemText primary={ROUTE_NAMES.USER_LIST} />
            </ListItem>
            <ListItem button component={Link} to={ROUTE_PATHS.EVENTS}>
              <ListItemText primary={ROUTE_NAMES.EVENTS} />
            </ListItem>
          </List>
        </div>
        <Divider />
        <div style={{ padding: "18px" }}>
          <ListItem button onClick={() => console.log("Settings")}>
            <IoSettings
              style={{
                marginRight: "8px",
              }}
            />
            <ListItemText primary="Settings" />
          </ListItem>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" style={{ marginBottom: "4px" }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            <List>
              <ListItem
                button
                onClick={() => {
                  localStorage.removeItem(LOCAL_STORAGE.TOKEN);
                  navigate(ROUTE_PATHS.LOGIN);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AppDrawer;
