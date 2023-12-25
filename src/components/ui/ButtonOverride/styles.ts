import { ColorSchemas } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = ({ color, disabled }: { color?: string; disabled?: boolean }) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    bg: disabled
      ? {}
      : {
          backgroundColor: ColorSchemas.blueV2,
        },
    contentStyle: {
      paddingVertical: verticalScale(4),
    },
    labelStyle: {
      color: theme.colors.white,
      fontSize: 17,
    },
    colorBlack: {
      color: color ?? theme.colors.black,
    },
  });
};

export default useStyles;
