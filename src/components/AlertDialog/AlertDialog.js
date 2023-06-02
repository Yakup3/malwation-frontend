import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const AlertDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  cancel = "Cancel",
  confirm = "Confirm",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancel}</Button>
        <Button onClick={onConfirm} color="primary">
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
