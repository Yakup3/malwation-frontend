import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Switch, Select, MenuItem } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ROUTE_PATHS } from "../../shared.constants";
import { fetchUserById, updateUserById } from "../../services/request";

const useStyles = makeStyles({
  userListContainer: {
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "800px",
    margin: "0 auto",
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
  title: {
    color: "#777777",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  backButtonIcon: {
    marginRight: "5px",
  },
  form: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
      "name email"
      "phone role"
      "status status"
      "button button"
    `,
    marginBottom: "10px",
  },
  submitButton: {
    justifySelf: "end",
    gridArea: "button",
  },
});

const UserDetailsPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [selectedRole, setSelectedRole] = useState("User");

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = () => {
    fetchUserById(id)
      .then((response) => {
        if (response.success) {
          setUser(response.user);
          setIsActive(response.user.active);
          setSelectedRole(response.user.role);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoBack = () => {
    navigate(ROUTE_PATHS.USER_LIST);
  };

  const handleStatusChange = () => {
    setIsActive(!isActive);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleNameChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const handlePhoneChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: event.target.value,
    }));
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      active: isActive,
      role: selectedRole,
    };

    console.log(updatedUser);

    updateUserById(id, updatedUser)
      .then((response) => {
        if (response.success) {
          handleGoBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.userListContainer}>
      <div className={classes.leftSide} />
      <div className={classes.rightSide}>
        <div className={classes.backButton}>
          <Button
            style={{
              color: "#999999",
            }}
            onClick={handleGoBack}
          >
            <IoIosArrowRoundBack
              size={"25"}
              className={classes.backButtonIcon}
            />
            Back to Users
          </Button>
        </div>
        <h1 className={classes.title}>Update User</h1>
        <form className={classes.form}>
          <TextField
            label="Name"
            style={{ gridArea: "name" }}
            value={user.name || ""}
            onChange={handleNameChange}
          />
          <TextField
            label="Email"
            style={{ gridArea: "email" }}
            value={user.email || ""}
            onChange={handleEmailChange}
          />
          <TextField
            label="Phone"
            style={{ gridArea: "phone" }}
            value={user.phone || ""}
            onChange={handlePhoneChange}
          />
          <Select
            value={selectedRole}
            onChange={handleRoleChange}
            style={{ gridArea: "role" }}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
          <div style={{ gridArea: "status" }}>
            <span>Status: </span>
            <Switch
              checked={isActive}
              onChange={handleStatusChange}
              color="primary"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
            onClick={handleUpdateUser}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;
