import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import useNotification from "../hook/useNotification";
import useSignUp from "../hook/useSignUp";

const SignUp = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const mutation = useSignUp({
    onSuccess: () => navigate("/auth"),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const passwordRepeat = formData.get("passwordRepeat") as string;

    if (password !== passwordRepeat) {
      showNotification("Passwords do not match");
      return;
    }

    if (email && username && password) {
      mutation.mutate({ email, username, password });
    }
  };
  return (
    <>
      <Typography variant="h5" sx={{ mb: "12px" }}>
        Sign up to Hellochat
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
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          required
        />
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
        <TextField
          label="Password Repeat"
          name="passwordRepeat"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Box mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/auth?page=signin")}
          >
            Already have an account? Sign in
          </Button>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
