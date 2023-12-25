import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    wrapperCardItem: {
      borderRadius: scale(12),
      padding: scale(10),
      marginTop: verticalScale(10),
      backgroundColor: ColorSchemas.white,
    },
    wrapperContent: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: scale(10),
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
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 2,
    },
  });
};

export default useStyles;
