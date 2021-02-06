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

export const useThemeController = (): [
  ThemeType,
  IUseThemeControllerCallbacks
] => {
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
