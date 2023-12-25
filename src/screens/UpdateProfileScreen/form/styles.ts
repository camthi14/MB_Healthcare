import { ColorSchemas } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    contentStyle: {
      paddingVertical: verticalScale(4),
      backgroundColor: ColorSchemas.blue,
    },
    labelStyle: {
      color: theme.colors.white,
      fontSize: 17,
    },
    colorBlack: {
      color: theme.colors.black,
    },
  });
};

export default useStyles;
