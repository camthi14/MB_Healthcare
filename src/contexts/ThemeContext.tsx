import COLORS from "@/constants/colors";
import { navigationRef } from "@/services/navigation";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    error: COLORS.RedInput,
    gray: COLORS.GrayLight,
    white: COLORS.White,
    black: COLORS.Black,
    surfaceContainer: "#ECE6F0",
    blackText: "#1D1B20",
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    error: COLORS.RedInput,
    gray: COLORS.Gray,
    white: COLORS.Black,
    black: COLORS.White,
    surfaceContainer: "#2B2930",
    blackText: "#E6E0E9",
  },
};

export type Theme = typeof lightTheme;
export type ThemeType = "dark" | "light";
export interface ThemeContextValues {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextValues>({
  theme: lightTheme,
  themeType: "light",
  toggleTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);
interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || "dark");

  const toggleTheme = useCallback(
    () => setThemeType((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  const theme = useMemo(() => (themeType === "dark" ? darkTheme : lightTheme), [themeType]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <PaperProvider theme={theme}>
        <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
          <StatusBar
            backgroundColor={"transparent"}
            translucent
            animated
            barStyle={themeType === "dark" ? "light-content" : "dark-content"}
          />
          {children}
        </ThemeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default ThemeContextProvider;
