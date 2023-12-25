import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = (isRead?: boolean) => {
  return StyleSheet.create({
    wrapperCardItem: {
      flex: 1,
      flexDirection: "row",
      gap: scale(10),
      marginHorizontal: SPACING,
      borderRadius: scale(12),
      padding: scale(10),
      alignItems: "center",
      backgroundColor: isRead ? ColorSchemas.white : ColorSchemas.blueLighterV2,
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
      marginTop: verticalScale(1),
      color: ColorSchemas.mutedDark,
      flexWrap: "wrap",
      flex: 1,
      lineHeight: 20,
    },
  });
};

export default useStyles;
