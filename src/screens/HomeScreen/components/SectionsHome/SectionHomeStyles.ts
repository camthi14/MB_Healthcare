import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    header: {
      fontSize: scale(18),
      fontWeight: "bold",
    },
    title: {
      fontSize: 24,
    },
    wrapperActions: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: SPACING,
      alignItems: "center",
    },
    specialty: {
      flex: 1,
      marginTop: verticalScale(16),
    },
  });
};

export default useStyles;
