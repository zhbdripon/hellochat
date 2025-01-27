import { Box, Button, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import useNotification from "../hook/useNotification";
import useSignUp from "../hook/useSignUp";
import CompactTextField from "./styled/CompactTextField";

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
      <Typography variant="h5">Sign up</Typography>
      <Typography variant="body2" sx={{ mb: "6px" }}>
        Create your HelloChat account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col w-full div>:mb-4"
      >
        <CompactTextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          required
        />
        <CompactTextField label="Username" name="username" fullWidth required />
        <CompactTextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
        />
        <CompactTextField
          label="Password Repeat"
          name="passwordRepeat"
          type="password"
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
          Create
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
