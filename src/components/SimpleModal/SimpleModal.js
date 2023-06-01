import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RiDeleteBinLine } from "react-icons/ri";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "10px",
    marginTop: "20px",
  },
  dialogPaper: {
    minWidth: "500px",
  },
});

const SimpleModal = ({
  open,
  isUpdate,
  onClose,
  onDelete,
  onUpdate,
  children,
}) => {
  const classes = useStyles();

  const handleCancel = () => {
    onClose();
  };

  const handleUpdate = () => {
    onUpdate();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle>{isUpdate ? "Update" : "Add"} Event</DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          {children}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button color="error" onClick={() => handleDelete()}>
              <RiDeleteBinLine size={18} />
            </Button>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleUpdate} color="primary">
                {isUpdate ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleModal;
