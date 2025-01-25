import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import useLogin from "../hook/useLogin";
import { User } from "../pages/Auth";
import APIClient from "../services/apiClient";

const SignIn = () => {
  const navigate = useNavigate();
  const mutation = useLogin(onLoginSuccess);

  async function onLoginSuccess() {
    const apiClient = new APIClient<User>("auth/users/me/");
    const userData = await apiClient.get();
    localStorage.setItem("username", userData.username);
    navigate("/");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (username && password) {
      mutation.mutate({ username, password });
    }
  };
  return (
    <>
      <Typography variant="h5" sx={{ mb: "12px" }}>
        Welcome to Hellochat
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > div": {
            marginBottom: "12px",
          },
        }}
      >
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Box mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/auth?page=signup")}
          >
            Don't have an account? Sign up
          </Button>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
