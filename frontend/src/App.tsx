import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";
import themeConfigs from "./config/theme.config";
import { themeModes } from "./config/theme.config";
import { Box, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <>
      <ThemeProvider theme={themeConfigs.custom({ mode: themeModes.light })}>
        {/* config toastify */}
        <Box
          sx={{
            "& .Toastify__toast-container": {
              [theme.breakpoints.down("sm")]: {
                width: "80% !important",
                left: "50% !important",
                transform: "translateX(-50%)",
              },
              [theme.breakpoints.up("sm")]: {
                width: "auto !important",
                left: "unset !important",
                transform: "none !important",
              },
            },
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme={themeModes.light}
            style={{ top: "7rem" }}
          />
        </Box>
        {/* mui reset css */}
        <CssBaseline />
        {/* mui reset css */}

        {/* app router */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) =>
                route.index ? (
                  <Route index element={route.element} />
                ) : (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                )
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
