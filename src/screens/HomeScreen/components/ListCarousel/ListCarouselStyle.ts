import { SCREEN_WIDTH, verticalScale } from "@/utils/scale";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    child: { width: SCREEN_WIDTH },
    imgBackground: {
      width: SCREEN_WIDTH,
      height: verticalScale(SCREEN_HEIGHT / 5.5),
      padding: 0,
    },
  });
};

export default useStyles;
