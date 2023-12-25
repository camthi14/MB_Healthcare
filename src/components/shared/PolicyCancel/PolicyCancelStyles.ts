import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    wrapperPolicy: {
      backgroundColor: ColorSchemas.blueLighterV2,
      padding: SPACING,
    },
    policyText: {
      backgroundColor: ColorSchemas.blueLighterV2,
      padding: SPACING,
      marginVertical: verticalScale(0.4),
      fontWeight: "500",
      lineHeight: scale(20),
    },
    policyLabel: {
      ...textStyles.H5,
      fontWeight: "bold",
      marginBottom: verticalScale(8),
    },
  });
};

export default useStyles;
