import { useState } from "react";
import useLogin from "../hook/useLogin";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLogin();

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
