import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { styles } from "./LoginPage.style";
import { ROUTE_PATHS } from "../../shared.constants";
import { AuthContext } from "../../auth/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("hello2@gmail.com");
  const [password, setPassword] = useState("password");

  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login(email, password);
      if (token) {
        navigate(ROUTE_PATHS.USER_LIST, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={styles.body}>
      <Container maxWidth="xs">
        <Box sx={styles.loginPageContainer}>
          <Typography variant="h4" sx={styles.title}>
            MALWATION
          </Typography>
          <Box sx={styles.loginForm}>
            <Typography variant="h6" sx={styles.subtitle}>
              Log in to your account
            </Typography>
            <Typography variant="h7" sx={styles.welcomeMessage}>
              Welcome back! Please enter your details.
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.button}
                fullWidth
              >
                Sign in
              </Button>
            </form>
          </Box>
          <Typography variant="h7" sx={styles.registerMessage}>
            Don't have an account?{" "}
            <Typography
              variant="h7"
              sx={styles.registerLink}
              component="a"
              href={ROUTE_PATHS.REGISTER}
            >
              Register
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
