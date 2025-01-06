import { useState } from "react";
import { useNavigate } from "react-router";

import useLogin from "../hook/useLogin";
import APIClient from "../services/apiClient";

export interface User {
  email: string;
  id: number;
  username: string;
}

const Auth = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLogin(onLoginSuccess);

  async function onLoginSuccess() {
    const apiClient = new APIClient<User>("auth/users/me/");
    const userData = await apiClient.get();
    localStorage.setItem("username", userData.username);
    navigate('/');
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ username, password });
        }}
      >
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Auth;
