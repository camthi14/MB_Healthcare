import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { moderateScale, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";
// import { useTheme } from "react-native-paper";

const useStyles = (fontSize?: "Small" | "Normal" | "H5" | "H4") => {
  const { theme } = useTheme();
  fontSize = fontSize ?? "Small";

  return StyleSheet.create({
    groupInput: {
      borderRadius: moderateScale(4),
      borderColor: theme.colors.secondary,
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(8),
    },
    label: {
      ...textStyles.Small,
      position: "absolute",
      left: scale(10),
      top: verticalScale(-8),
      zIndex: 999,
      paddingHorizontal: scale(2),
    },
    iconRight: {
      position: "absolute",
      right: scale(0),
    },
    helperError: {
      color: theme.colors.error,
      fontStyle: "italic",
      ...textStyles[fontSize],
    },
    helperInfo: {
      color: theme.colors.gray,
      fontStyle: "italic",
      ...textStyles[fontSize],
    },
    input: {
      color: theme.colors.text,
    },
  });
};

export default useStyles;
