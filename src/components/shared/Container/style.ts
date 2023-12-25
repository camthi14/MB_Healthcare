import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const useStyle = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    wrapperView: {
      paddingBottom: inset.bottom,
    },
  });
};

export default useStyle;
