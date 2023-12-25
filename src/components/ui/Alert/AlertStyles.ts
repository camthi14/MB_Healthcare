import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

type UseStylesPayload = {
  color?: string;
  background?: string;
  borderColor?: string;
};

const useStyles = ({ background, borderColor, color }: UseStylesPayload) => {
  return StyleSheet.create({
    guildSelectTime: {
      marginBottom: verticalScale(10),
      borderRadius: scale(3),
      borderWidth: 1,
      borderColor: borderColor ?? ColorSchemas.yellowDark,
      padding: SPACING,
      backgroundColor: background ?? ColorSchemas.yellowLighter,
    },
    guildSelectTimeText: {
      color: color ?? ColorSchemas.black,
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
      letterSpacing: 0.2,
    },
  });
};

export default useStyles;
