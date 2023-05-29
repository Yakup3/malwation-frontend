import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

const AppDrawer = () => {
  return (
    <Drawer variant="permanent">
      <div>
        <IconButton>{/* <IoChevronBack /> */}</IconButton>
      </div>
      <Divider />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            console.log("logout");
          }}
        >
          <Tooltip title={"common.logout"}>
            <ListItemIcon>{/* <IoLogOut /> */}</ListItemIcon>
          </Tooltip>
          <ListItemText primary={"common.logout"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
