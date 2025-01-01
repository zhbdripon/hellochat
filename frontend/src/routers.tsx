import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import Server from "./pages/Server";
import ErrorPage from "./pages/ErrorPage";

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Server />},
    ]
  }
])

export default browserRouter;