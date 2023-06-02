import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = ({
  severity = "success",
  isSnackbarOpen,
  snackbarMessage,
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
