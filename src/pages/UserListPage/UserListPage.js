import React, { useEffect, useState } from "react";
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
import { deleteUserById, fetchUsers } from "../../services/request";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import SnackbarComponent from "../../components/Snackbar/SnackbarComponent";

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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    fetchUsers()
      .then((response) => {
        if (response.success) {
          setUsers(response.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (userId) => {
    deleteUserById(userId)
      .then((response) => {
        if (response.success) {
          fetchUserList();
          setIsSnackbarOpen(true);
          setSnackbarMessage("User deleted successfully.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId) => {
    navigate(ROUTE_PATHS.USER_DETAILS.replace(":id", userId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser._id);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteDialogOpen = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedUser(null);
    setDeleteDialogOpen(false);
  };

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
                  <TableRow key={user._id}>
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
                      <Button onClick={() => handleDeleteDialogOpen(user)}>
                        <RiDeleteBinLine size={18} />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUserClick(user._id)}
                        component={Link}
                        to={ROUTE_PATHS.USER_DETAILS.replace(":id", user._id)}
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
      <SnackbarComponent
        isSnackbarOpen={isSnackbarOpen}
        snackbarMessage={snackbarMessage}
        handleClose={handleClose}
      />
      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteUser}
        cancel="No"
        confirm="Yes"
        title="Delete User"
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserListPage;
