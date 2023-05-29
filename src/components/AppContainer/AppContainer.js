import React from "react";
import AppDrawer from "../AppDrawer/AppDrawer";

const AppContainer = ({ component: Component }) => {
  return (
    <div>
      <AppDrawer />
      {Component}
    </div>
  );
};

export default AppContainer;
