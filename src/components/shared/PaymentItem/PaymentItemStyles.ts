import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const useStyles = (m?: number) => {
  return StyleSheet.create({
    cardPayment: {
      backgroundColor: ColorSchemas.greyLighterV2,
      marginVertical: m ?? verticalScale(14),
      borderRadius: scale(8),
      paddingVertical: verticalScale(14),
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: SPACING,
      borderWidth: 2,
      borderColor: ColorSchemas.greyLighterV2,
    },
    cardTitle: {
      ...textStyles.H5,
      fontWeight: "500",
    },
    colorRadio: {
      color: ColorSchemas.blue,
    },
    image: {
      width: scale(30),
      height: scale(30),
    },
    wrapperTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });
};

export default useStyles;
