import React, { useEffect, useState } from "react";
import { ITheme, loadTheme } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { useMediaQuery } from "react-responsive";
import { ThemeType } from "./types";
import { useLogger } from "../logger";

export type IAppThemeProvider = {
  activeTheme: ThemeType;
  lightTheme: ITheme;
  darkTheme: ITheme;
};
export const AppThemeProvider: React.FC<IAppThemeProvider> = ({
  activeTheme,
  children,
  lightTheme,
  darkTheme,
}) => {
  const { debug, info } = useLogger("@flying-dice/fluentui-toolkit:AppThemeProvider");
  const darkSystem = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [theme, setTheme] = useState(
    activeTheme === "dark" || (activeTheme === "system" && darkSystem) ? darkTheme : lightTheme
  );

  useEffect(() => {
    info("Setting up AppThemeProvider");
  }, []);

  useEffect(() => {
    if (activeTheme === "dark" || (darkSystem && activeTheme === "system")) {
      debug("Loading Dark Theme");
      setTheme(darkTheme);
      loadTheme(darkTheme);
      document.body.style.backgroundColor = darkTheme.palette.white;
    } else {
      debug("Loading Light Theme");
      setTheme(lightTheme);
      loadTheme(lightTheme);
      document.body.style.backgroundColor = lightTheme.palette.white;
    }
  }, [darkSystem, activeTheme, lightTheme, darkTheme]);

  return (
    <ThemeProvider theme={theme} style={{ display: "flex", flex: "auto" }}>
      {children}
    </ThemeProvider>
  );
};
