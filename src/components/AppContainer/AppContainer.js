import React from "react";
import AppDrawer from "../AppDrawer/AppDrawer";

const AppContainer = ({ component }) => {
  return (
    <div>
      <AppDrawer />
      {component}
    </div>
  );
};

export default AppContainer;
