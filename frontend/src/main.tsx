import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router";

import { ReactQueryDevtools } from "react-query/devtools";
import { ConfirmationModalProvider } from "./context/confirmationModalProvider.tsx";
import NotificationProvider from "./context/notificationProvider.tsx";
import browserRouter from "./routers.tsx";

import "./index.css";

const queryClient = new QueryClient();

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <ConfirmationModalProvider>
            <RouterProvider router={browserRouter} />
          </ConfirmationModalProvider>
        </NotificationProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  </StrictMode>
);
