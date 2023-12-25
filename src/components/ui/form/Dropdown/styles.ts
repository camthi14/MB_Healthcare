import { useTheme } from "@/contexts/ThemeContext";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const useStyles = (error?: boolean) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
    },
    dropdown: {
      height: 50,
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(9),
      borderRadius: scale(10),
      borderWidth: error ? 2 : 1,
      borderColor: error ? theme.colors.error : theme.colors.gray,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      fontSize: scale(13),
      fontWeight: "normal",
      marginBottom: verticalScale(6),
      color: error ? theme.colors.error : theme.colors.black,
    },
    placeholderStyle: {
      fontSize: 16,
      color: theme.colors.gray,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
};

export default useStyles;
