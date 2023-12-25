import { scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = (screenHeight: number) => {
  return StyleSheet.create({
    bottomSheetContainer: {
      height: screenHeight,
      width: "100%",
      backgroundColor: "black",
      position: "absolute",
      top: screenHeight / 1.5,
      // right: 0,
      // left: 0,
      borderRadius: scale(25),
    },
  });
};

export default useStyles;
