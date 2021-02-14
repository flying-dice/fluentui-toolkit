import { initializeIcons } from "@fluentui/react";
import { AppThemeProvider, useThemeController } from "../src";
import { useEffect } from "react";
import { darkTheme, lightTheme } from "./themes";

initializeIcons();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Fluent UI Theme",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: ["light", "dark"],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const [theme, { enableTheme }] = useThemeController();

  useEffect(() => {
    enableTheme(context.globals.theme);
  }, [context.globals.theme]);

  return (
    <AppThemeProvider activeTheme={theme} lightTheme={lightTheme} darkTheme={darkTheme}>
      <Story {...context} />
    </AppThemeProvider>
  );
};
export const decorators = [withThemeProvider];
