import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Auth from "./pages/Auth";
import ErrorPage from "./pages/ErrorPage";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import Layout from "./pages/Layout";
import Server from "./pages/Server";

const PrivateRoute = () => {
  const username = localStorage.getItem("username");
  return username ? <Outlet /> : <Navigate to="/auth" replace />;
};

const PublicRoute = () => {
  const username = localStorage.getItem("username");
  return !username ? <Outlet /> : <Navigate to="/" replace />;
};

const browserRouter = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <Server /> }],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/gcal",
    element: <GoogleAuthCallback />,
    errorElement: <ErrorPage />,
  },
]);

export default browserRouter;
