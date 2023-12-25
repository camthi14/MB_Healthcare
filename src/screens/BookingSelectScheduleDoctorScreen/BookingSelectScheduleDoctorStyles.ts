import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const MARGIN_VERTICAL = verticalScale(20);

const useStyles = () => {
  return StyleSheet.create({
    wrapperCalendar: {
      paddingHorizontal: SPACING,
      marginTop: MARGIN_VERTICAL,
    },
    calendars: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: scale(8),
    },
  });
};

export default useStyles;
