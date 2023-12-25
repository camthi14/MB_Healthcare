import { ColorSchemas } from "@/constants/colors";
import { statusBarHeight } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
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
    avatar: { position: "relative" },
  });
};

export default useStyles;
