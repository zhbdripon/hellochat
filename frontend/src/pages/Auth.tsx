import { useNavigate } from "react-router";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import useLogin from "../hook/useLogin";
import APIClient from "../services/apiClient";

export interface User {
  email: string;
  id: number;
  username: string;
}

const Auth = () => {
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
    <div className="w-svw h-svh bg-authBg bg-cover bg-no-repeat">
      <Paper
        elevation={3}
        className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[500px] p-4 rounded-lg"
      >
        <Typography variant="h5">Welcome to Hellochat</Typography>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Auth;
