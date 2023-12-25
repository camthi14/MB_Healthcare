import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = ({ active, disabled }: { active?: boolean; disabled?: boolean }) => {
  return StyleSheet.create({
    item: {
      backgroundColor: active ? ColorSchemas.blue : ColorSchemas.greyLighterV3,
      paddingVertical: verticalScale(8),
      paddingHorizontal: scale(4),
      borderRadius: scale(40),
      width: `${95 / 3}%`,
      borderWidth: 2,
      borderColor: disabled ? ColorSchemas.grey : ColorSchemas.blue,
      alignItems: "center",
    },
    itemText: {
      fontWeight: "bold",
      color: disabled ? ColorSchemas.grey : active ? ColorSchemas.white : ColorSchemas.blue,
    },
  });
};

export default useStyles;
