import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  userListContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  leftSide: {
    width: "13%",
    backgroundColor: "#f0f0f0",
  },
  rightSide: {
    flex: 1,
    marginLeft: "10px",
    backgroundColor: "#ffffff",
    padding: "10px",
  },
});

const EventsPage = () => {
  const classes = useStyles();

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 2, name: "Jane Smith" },
    { id: 2, name: "Jane Smith" },
    { id: 2, name: "Jane Smith" },
  ];

  return (
    <div className={classes.userListContainer}>
      <div className={classes.leftSide} />
      <div className={classes.rightSide}>
        <h1>EVENTS</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsPage;
