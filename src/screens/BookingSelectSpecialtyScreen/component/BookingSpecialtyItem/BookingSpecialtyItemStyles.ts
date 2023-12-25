import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    wrapperCardItem: {
      flex: 1,
      flexDirection: "row",
      gap: scale(10),
      marginHorizontal: SPACING,
      borderRadius: scale(12),
      padding: scale(10),
      alignItems: "center",
      backgroundColor: ColorSchemas.white,
    },
    image: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(13),
    },
    title: {
      ...textStyles.H5,
      fontWeight: "bold",
    },
    content: {
      fontSize: scale(12),
      color: ColorSchemas.mutedDark,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};

export default useStyles;
