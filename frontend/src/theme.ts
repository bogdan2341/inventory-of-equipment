import { createMuiTheme, rgbToHex, Theme } from "@material-ui/core/styles";
import { deepPurple, cyan, blue, indigo } from "@material-ui/core/colors";
import { useState } from "react";

type ThemeType = "light" | "dark" | undefined;

export let isDark: boolean;

function useAppTheme(initThemeType?: ThemeType): [Theme, () => void] {
  const themeTypeFromStor: ThemeType =
    (localStorage.getItem("themeType") as ThemeType) ||
    initThemeType ||
    "light";

  const [themeType, setThemeType] = useState(themeTypeFromStor);

  const toggleDark = () => {
    setThemeType((prevType) => {
      const curType = prevType === "light" ? "dark" : "light";
      localStorage.setItem("themeType", curType);
      return curType;
    });
  };

  isDark = themeType === "dark";

  const theme = createMuiTheme({
    palette: {
      type: themeType,
      primary: {
        main: isDark ? blue[100] : indigo[700],
      },
      secondary: {
        main: isDark ? blue[100] : indigo[500],
      },
    },
  });

  theme.overrides = {
    MuiAppBar: {
      colorPrimary: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
      },
    },
    MuiListItem: {
      root: {
        width: "auto",
        margin: ".3rem 0.5rem",
        borderRadius: theme.shape.borderRadius,
      },
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  };

  return [theme, toggleDark];
}

export default useAppTheme;
