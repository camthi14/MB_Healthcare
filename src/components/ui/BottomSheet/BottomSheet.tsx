import React from "react";
import { Dimensions, Text, View } from "react-native";
import useStyles from "./BottomSheetStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = () => {
  const styles = useStyles(SCREEN_HEIGHT);

  return <View style={styles.bottomSheetContainer} />;
};

export default BottomSheet;
