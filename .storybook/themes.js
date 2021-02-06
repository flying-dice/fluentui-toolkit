const { createTheme } = require("@fluentui/react");

export const lightTheme = createTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

export const darkTheme = createTheme({
  palette: {
    themePrimary: "#45aeff",
    themeLighterAlt: "#03070a",
    themeLighter: "#0b1c29",
    themeLight: "#15344d",
    themeTertiary: "#296999",
    themeSecondary: "#3d99e0",
    themeDarkAlt: "#57b6ff",
    themeDark: "#72c2ff",
    themeDarker: "#97d2ff",
    neutralLighterAlt: "#393939",
    neutralLighter: "#383838",
    neutralLight: "#363636",
    neutralQuaternaryAlt: "#323232",
    neutralQuaternary: "#303030",
    neutralTertiaryAlt: "#2e2e2e",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#3b3b3b",
  },
});
