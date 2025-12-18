import { AppBar, Toolbar, Stack, IconButton } from "@mui/material";
import { WbSunnyOutlined, DarkModeOutlined } from "@mui/icons-material";
import { themeModes } from "../config/theme.config";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: "#87CEFA" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo />

        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <LanguageToggle />
          <IconButton sx={{ color: "inherit" }} onClick={() => {}}>
            {themeModes.light ? <WbSunnyOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
