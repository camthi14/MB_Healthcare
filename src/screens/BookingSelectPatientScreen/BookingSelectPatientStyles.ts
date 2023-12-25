import { ColorSchemas } from "@/constants/colors";
import { MARGIN_BOTTOM_NAV, SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    spacing: {
      paddingHorizontal: SPACING,
    },
    wrapperHeader: {
      backgroundColor: ColorSchemas.white,
      marginHorizontal: SPACING,
      borderRadius: scale(10),
      paddingHorizontal: scale(8),
      paddingVertical: verticalScale(12),
    },
    head: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headRightText: {
      fontSize: scale(10),
      color: ColorSchemas.blue,
    },
    wrapperPatient: {
      flexDirection: "row",
      marginTop: verticalScale(10),
    },
    m: {
      margin: scale(5),
    },
    wrapperProfile: {
      marginTop: verticalScale(20),
      marginHorizontal: SPACING,
    },
    wrapperView: {
      paddingBottom: MARGIN_BOTTOM_NAV,
    },

    addBtn: {
      backgroundColor: ColorSchemas.greyLighter,
      width: scale(50),
      height: verticalScale(50),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(4),
      borderWidth: 2,
      borderColor: ColorSchemas.greyLighter,
      marginRight: scale(5),
    },
  });
};

export default useStyles;
