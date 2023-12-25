import { ColorSchemas } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

export const MAX_COLUMN = 3;

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      padding: SPACING,
    },
    actions: {
      marginTop: verticalScale(10),
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    line: {
      width: scale(60),
      height: verticalScale(2),
      backgroundColor: ColorSchemas.blue,
    },
    iconColor: {
      color: ColorSchemas.white,
    },
    buttonTextColor: {
      color: ColorSchemas.white,
    },
    button: {
      borderRadius: scale(8),
      backgroundColor: ColorSchemas.blue,
    },
    labelButton: {
      textTransform: "uppercase",
    },
    wrapperCard: {
      marginTop: verticalScale(8),
      marginHorizontal: SPACING,
      flexDirection: "row",
      flexWrap: "wrap",
      borderRadius: scale(12),
      borderWidth: 1,
      borderColor: ColorSchemas.blue,
    },
    card: {
      height: verticalScale(80),
      width: `${100 / MAX_COLUMN}%`,
      alignItems: "center",
      justifyContent: "center",
      borderColor: ColorSchemas.blue,
      paddingHorizontal: scale(23),
    },
    cardText: {
      color: ColorSchemas.mutedDark,
      textAlign: "center",
      marginTop: verticalScale(4),
      fontWeight: "400",
    },
    cardIconColor: {
      color: ColorSchemas.blue,
    },
  });
};

export default useStyles;
