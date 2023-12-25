import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      borderWidth: 1,
      paddingVertical: verticalScale(5),
      paddingHorizontal: scale(10),
      alignItems: "center",
      borderRadius: scale(15),
      width: scale(135),
      justifyContent: "space-between",
      borderColor: ColorSchemas.grey,
    },
    action: {
      paddingVertical: verticalScale(5),
      paddingHorizontal: scale(6),
      borderRadius: scale(12),
      backgroundColor: ColorSchemas.blueLighterV2,
    },
    colorIcon: {
      color: ColorSchemas.blue,
    },
    value: {
      fontWeight: "bold",
    },
  });
};

export default useStyles;
