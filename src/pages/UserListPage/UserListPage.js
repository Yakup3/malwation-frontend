import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { RiDeleteBinLine, RiArrowRightSLine } from "react-icons/ri";
import { ROUTE_PATHS } from "../../shared.constants";

const useStyles = makeStyles({
  userListContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  leftSide: {
    width: "13%",
    backgroundColor: "#f0f0f0",
  },
  title: {
    color: "#777777",
  },
  rightSide: {
    flex: 1,
    marginLeft: "10px",
    backgroundColor: "#ffffff",
    padding: "10px",
  },
  activeStatus: {
    display: "flex",
    alignItems: "center",
  },
  activeCircle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "5px",
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "red",
  },
  searchContainer: {
    marginBottom: "10px",
    "& .MuiTextField-root": {
      width: "500px",
    },
  },
  notFoundMessage: {
    textAlign: "center",
    marginTop: "20px",
    fontStyle: "italic",
  },
});

const UserListPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      role: "Admin",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      role: "User",
      active: false,
    },
  ];

  const deleteUser = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
  };

  const handleUserClick = (userId) => {
    navigate(ROUTE_PATHS.USER_DETAILS.replace(":id", userId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.userListContainer}>
      <div className={classes.leftSide} />
      <div className={classes.rightSide}>
        <h1 className={classes.title}>Users</h1>
        <div className={classes.searchContainer}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className={classes.notFoundMessage}>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className={classes.activeStatus}>
                        <div
                          className={`${classes.activeCircle} ${
                            user.active ? classes.active : classes.inactive
                          }`}
                        />
                        {user.active ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteUser(user.id)}>
                        <RiDeleteBinLine size={18} />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUserClick(user.id)}
                        component={Link}
                        to={ROUTE_PATHS.USER_DETAILS.replace(":id", user.id)}
                      >
                        <RiArrowRightSLine size={25} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserListPage;
