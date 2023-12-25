import { useTheme } from "@/contexts/ThemeContext";
import { scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme, themeType } = useTheme();

  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: themeType === "light" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)",
      zIndex: 1000,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bgLoading: {
      width: scale(50),
      height: scale(50),
      padding: scale(8),
      borderRadius: scale(25),
      justifyContent: "center",
    },
  });
};

export default useStyles;
