import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
});

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress />
    </div>
  );
}
