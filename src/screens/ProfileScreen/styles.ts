import { ColorSchemas } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { SPACING, scale, statusBarHeight, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    header: {
      paddingTop: statusBarHeight(15),
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      paddingHorizontal: SPACING,
      paddingBottom: verticalScale(20),
      flexDirection: "column",
      borderColor: ColorSchemas.grey,
    },
    bottom: {
      paddingTop: statusBarHeight(1),
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      // paddingHorizontal: SPACING,
      // paddingStart: verticalScale(20),
      flexDirection: "row",
      borderColor: ColorSchemas.grey,
    },
    segment: {},
    pt15: {
      marginTop: verticalScale(15),
    },
    pt30: {
      marginTop: verticalScale(30),
    },
    p15: {
      paddingHorizontal: scale(15),
    },
    pb15: {
      paddingBottom: scale(15),
    },
    py15: {
      paddingVertical: scale(15),
    },
    displayNameWrapper: {
      marginTop: verticalScale(10),
      alignItems: "center",
      gap: scale(10),
    },
    icon: {
      position: "absolute",
      bottom: 4,
      right: 3,
      backgroundColor: ColorSchemas.blue,
      padding: 4,
      paddingHorizontal: 5,
      borderRadius: 8,
    },
    avatar: { position: "relative" },
    grid: {
      gap: 25,
    },
  });
};

export default useStyles;
