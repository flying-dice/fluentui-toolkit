import { useEffect, useState } from "react";
import { ThemeType } from "./types";

const themeTransitions: Record<ThemeType, ThemeType> = {
  system: "dark",
  dark: "light",
  light: "system",
};

export type IUseThemeControllerCallbacks = {
  nextTheme: () => void;
  enableTheme: (theme: ThemeType) => void;
};

/**
 * the `useThemeController` hook should be used in conjunction with the `AppThemeProvider`, it gives
 * access to the active theme and also callbacks to select the next/specific theme.
 *
 * The selected Theme is stored in localStorage under `theme` as either "`light`", "`dark`" or "`system`"
 *  it will be extracted from local storage to ensure persistence.
 *
 * The theme returned by the hook is this "`light/dark/system`" key, you should use the `useTheme`
 * hook to access the actual theme.
 *
 * @example
 * import { createTheme, initializeIcons } from "@fluentui/react"
 *
 * export const lightTheme = createTheme({
 *  palette: {
 *    ...
 *  },
 * })
 *
 * const App = () => {
 *  const [theme] = useThemeController()
 *
 *  return (
 *    <AppThemeProvider activeTheme={theme} darkTheme={lightTheme} lightTheme={lightTheme}>
 *      <CampaignDesignerPage />
 *    </AppThemeProvider>
 *  )
 * }
 *
 */
export const useThemeController = (): [ThemeType, IUseThemeControllerCallbacks] => {
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) || "system"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    setTheme(themeTransitions[theme]);
  };

  const enableTheme = (theme: ThemeType) => {
    setTheme(theme);
  };

  return [theme, { nextTheme, enableTheme }];
};
