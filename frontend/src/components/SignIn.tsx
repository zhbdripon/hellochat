import { Box, Button, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import useGoogleAuthorizationURL from "../hook/useGoogleAuthorizationURL";
import useLogin from "../hook/useLogin";
import { User } from "../pages/Auth";
import APIClient from "../services/apiClient";
import GoogleSignInButton from "./GoogleSignInButton";
import CompactTextField from "./styled/CompactTextField";

const SignIn = () => {
  const navigate = useNavigate();
  const mutation = useLogin(onLoginSuccess);
  const googleAuthURLMutation = useGoogleAuthorizationURL();

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
      <Typography variant="h5">Sign in</Typography>
      <Typography variant="body2" sx={{ mb: "6px" }}>
        Welcome, please sign in to continue
      </Typography>
      <GoogleSignInButton onClick={() => googleAuthURLMutation.mutate()} />
      <Typography variant="body2" sx={{ mb: "6px" }}>
        or
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col w-full div>:mb-4"
      >
        <CompactTextField label="Username" name="username" fullWidth required />
        <CompactTextField
          label="Password"
          name="password"
          type="password"
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
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
