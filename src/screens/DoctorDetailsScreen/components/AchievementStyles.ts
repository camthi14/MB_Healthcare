import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const ICON_SPACING = 50;

const useStyles = () => {
  return StyleSheet.create({
    item: {
      width: `${95 / 4}%`,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: ColorSchemas.white,
      paddingVertical: verticalScale(10),
      borderRadius: scale(4),
      elevation: 3,
    },
    itemWrapperIcon: {
      backgroundColor: ColorSchemas.blueLighterV2,
      width: ICON_SPACING,
      height: ICON_SPACING,
      borderRadius: ICON_SPACING / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    itemIcon: {},
    itemText: {
      fontSize: 12,
      textTransform: "capitalize",
    },
    itemTotal: {
      fontWeight: "bold",
      color: ColorSchemas.blue,
      textAlign: "center",
    },
  });
};

export default useStyles;
