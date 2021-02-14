import React, { createContext, useContext } from "react";
import { createTheme, ITheme } from "@fluentui/react";

export const ThemeContext = createContext<ITheme>(createTheme());

export type IThemeProvider = {
  theme: ITheme;
};
export const ThemeProvider: React.FC<IThemeProvider> = ({ children, theme }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the active theme from the `ThemeContext`
 *
 * Will react to changes in theme as toggled by theme controller.
 *
 * @example
 *  import React from "react"
 *  import { AutoStack, useTheme } from "@flying-dice/fluentui-toolkit"
 *
 *  export const ListWrapper: React.FC<IListWrapper> = ({ children }) => {
 *   const { palette } = useTheme()
 *
 *   return <AutoStack style={{backgroundColor: palette.white }}>{children}</AutoStack>
 * }
 *
 */
export const useTheme = () => useContext<ITheme>(ThemeContext);
