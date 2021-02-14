import React, { useEffect, useState } from "react";
import { ITheme, loadTheme } from "@fluentui/react";
import { useMediaQuery } from "react-responsive";
import { ThemeType } from "./types";
import { useLogger } from "../logger";
import { ThemeProvider as OurThemeProvider } from "./theme-context";
import { ThemeProvider } from "@fluentui/react-theme-provider";

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
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [theme, setTheme] = useState<ITheme>(
    activeTheme === "dark" || (activeTheme === "system" && prefersDark) ? darkTheme : lightTheme
  );

  useEffect(() => {
    info("Setting up AppThemeProvider");
  }, [info]);

  useEffect(() => {
    if (activeTheme === "dark" || (prefersDark && activeTheme === "system")) {
      debug("Loading Dark Theme");
      loadTheme(darkTheme);
      setTheme(darkTheme);
      document.body.style.backgroundColor = darkTheme.palette.white;
    } else {
      debug("Loading Light Theme");
      loadTheme(lightTheme);
      setTheme(lightTheme);
      document.body.style.backgroundColor = lightTheme.palette.white;
    }
  }, [prefersDark, activeTheme, lightTheme, darkTheme, debug]);

  return (
    <OurThemeProvider theme={theme}>
      <ThemeProvider theme={theme} style={{ display: "flex", flex: "auto" }}>
        {children}
      </ThemeProvider>
    </OurThemeProvider>
  );
};
