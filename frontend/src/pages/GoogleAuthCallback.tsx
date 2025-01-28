import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useGoogleLoginMutation from "../hook/useGoogleLoginMutation";

const GoogleAuthCallback = () => {
  const mutation = useGoogleLoginMutation();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (code && state) {
      const data = new URLSearchParams();
      data.append("state", state);
      data.append("code", code);
      mutation.mutate(data);
    }
  }, [code, state]);

  return <div>Google Authenticating...</div>;
};

export default GoogleAuthCallback;
