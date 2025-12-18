import { Box } from "@mui/material";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
          height: "100vh",
          gap: { xs: 0, sm: 2 },
        }}
      >
        <Box sx={{ flexShrink: 1 }}>
          <Header />
        </Box>

        <Box
          sx={{
            flex: 1,
            py: { xs: 0, sm: 2 },
            px: { xs: 1, sm: 2 },
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
