import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { styles } from "./RegisterPage.style";
import { handleRegister } from "../../services/request";
import SnackbarComponent from "../../components/Snackbar/SnackbarComponent";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setIsSnackbarOpen(true);
      setSnackbarMessage("Passwords do not match");
    } else {
      handleRegister({ email, password })
        .then((res) => {
          if (res.success) {
            navigate(-1);
          } else {
            setIsSnackbarOpen(true);
            setSnackbarMessage(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box sx={styles.body}>
      <Container maxWidth="xs">
        <Box sx={styles.registerPageContainer}>
          <Typography variant="h4" sx={styles.title}>
            MALWATION
          </Typography>
          <Box sx={styles.registerForm}>
            <Typography variant="h6" sx={styles.subtitle}>
              Create a new account
            </Typography>
            <Typography variant="h7" sx={styles.welcomeMessage}>
              Welcome! Please enter your details.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                sx={styles.input}
                fullWidth
                required
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                sx={styles.input}
                fullWidth
                required
              />
              <TextField
                type="password"
                label="Verify Password"
                value={verifyPassword}
                onChange={handleVerifyPasswordChange}
                sx={styles.input}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.button}
                fullWidth
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
      <SnackbarComponent
        severity="error"
        isSnackbarOpen={isSnackbarOpen}
        snackbarMessage={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default RegisterPage;
