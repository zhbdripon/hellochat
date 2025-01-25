import { Paper } from "@mui/material";
import { useSearchParams } from "react-router";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export interface User {
  email: string;
  id: number;
  username: string;
}

const Auth = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  return (
    <div className="w-svw h-svh bg-authBg bg-cover bg-no-repeat">
      <Paper
        elevation={3}
        className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[500px] p-4 rounded-lg"
      >
        {page === "signup" ? <SignUp /> : <SignIn />}
      </Paper>
    </div>
  );
};

export default Auth;
