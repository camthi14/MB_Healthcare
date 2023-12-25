import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useGlobalStyles = () => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: SPACING,
    },
    surfaceBottom: {
      padding: SPACING,
      borderTopLeftRadius: scale(15),
      borderTopRightRadius: scale(15),
    },
    surfaceBtnBottom: {
      borderRadius: scale(40),
    },
    surfaceBtnContentStyles: {
      paddingHorizontal: scale(40),
      paddingVertical: scale(4),
    },
    surfaceBtnColor: {
      color: ColorSchemas.blue,
    },
  });
};

export default useGlobalStyles;
