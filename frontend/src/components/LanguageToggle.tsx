import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { themeModes } from "../config/theme.config";
import { languageModes } from "../config/LanguageMode.config";

const LanguageToggle = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginLeft: "1rem",
      }}
      onClick={() => {}}
    >
      <Box
        sx={{
          width: 70,
          height: 27,
          borderRadius: 16,
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor:
            theme.palette.mode === themeModes.dark ? "#444" : "#ddd",
          position: "relative",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            position: "absolute",
            left: languageModes.vi === languageModes.vi ? "8px" : "40px",
            transition: "left 0.3s ease-in-out",
            textTransform: "uppercase",
          }}
        >
          {languageModes.vi === languageModes.vi
            ? languageModes.vi
            : languageModes.en}
        </Typography>

        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            position: "absolute",
            left: languageModes.vi === languageModes.vi ? "40px" : "1px",
            transition: "left 0.3s ease-in-out",
            overflow: "hidden",
            border: "2px solid white",
          }}
        >
          <img
            src={
              languageModes.vi === languageModes.vi
                ? "/Flag_of_Vietnam.svg"
                : "/Flag_of_the_United_Kingdom.svg"
            }
            alt={
              languageModes.vi === languageModes.vi ? "Vietnam Flag" : "UK Flag"
            }
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageToggle;
