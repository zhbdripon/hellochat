import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import Server from "./pages/Server";
import ErrorPage from "./pages/ErrorPage";
import Auth from "./pages/Auth";

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Server />},
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
  }
])

export default browserRouter;