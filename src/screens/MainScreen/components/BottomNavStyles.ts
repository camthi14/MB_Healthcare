import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const SPACING_BUTTON_TAB_VIEW = 60;

const useStyles = (color?: string) => {
  return StyleSheet.create({
    tabBar: {
      backgroundColor: ColorSchemas.white,
      shadowColor: ColorSchemas.red,
      elevation: 6,
      height: verticalScale(50),
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
    tabBarItem: {
      justifyContent: "center",
      alignItems: "center",
    },
    activeColor: {
      color: ColorSchemas.blue,
    },
    tabBarItemText: {
      color: color,
    },
    buttonTabWrapper: {
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: ColorSchemas.blue,
      elevation: 5,
    },
    buttonTabView: {
      width: scale(SPACING_BUTTON_TAB_VIEW),
      height: scale(SPACING_BUTTON_TAB_VIEW),
      borderRadius: scale(SPACING_BUTTON_TAB_VIEW / 2),
      backgroundColor: color,
    },
  });
};

export default useStyles;
