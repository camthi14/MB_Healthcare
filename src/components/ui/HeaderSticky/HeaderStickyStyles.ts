import { scale, statusBarHeight } from "@/utils/scale";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useStyles = (isFloating: boolean, height: number, isTransparent: boolean) => {
  const safeArea = useSafeAreaInsets();

  return StyleSheet.create({
    header: {
      paddingTop: safeArea.top,
      marginBottom: isFloating ? -height - safeArea.top : 0,
      height: height + safeArea.top,
      justifyContent: "center",
      shadowOffset: { height: 0, width: 0 },
      backgroundColor: isTransparent ? "#0001" : "#FFF",
      shadowOpacity: isTransparent ? 0 : 0.5,
      elevation: isTransparent ? 0.01 : 5,
      zIndex: 100,
      alignItems: "center",
    },
    icon: {
      position: "absolute",
      top: statusBarHeight(5),
      left: scale(20),
      zIndex: 20,
      color: isTransparent ? "#FFF" : "#000",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
      color: isTransparent ? "transparent" : "#000",
      maxWidth: 200,
      minWidth: 200,
    },
  });
};

export default useStyles;
