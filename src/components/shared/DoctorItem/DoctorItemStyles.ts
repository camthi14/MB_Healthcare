import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    surface: {
      marginHorizontal: SPACING,
      marginVertical: scale(8),
      padding: scale(20),
      borderRadius: scale(13),
      backgroundColor: ColorSchemas.white,
    },
    wrapper: {
      flex: 1,
      justifyContent: "space-between",
      gap: scale(15),
    },
    image: {
      width: scale(98),
      height: scale(98),
      borderRadius: scale(98 / 2),
    },
    wrapperContent: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    title: {
      fontWeight: "bold",
      fontSize: scale(11),
      maxWidth: scale(110),
      minWidth: scale(100),
    },
    desc: {
      marginTop: verticalScale(2),
      color: ColorSchemas.muted,
      fontStyle: "italic",
      fontSize: scale(13),
      maxWidth: scale(110),
      minWidth: scale(100),
    },
    price: {
      color: ColorSchemas.blue,
      fontWeight: "bold",
      fontSize: scale(15),
    },
    subPrice: {
      color: ColorSchemas.muted,
      fontWeight: "bold",
      fontSize: scale(12),
      textAlign: "right",
    },
  });
};

export default useStyles;
