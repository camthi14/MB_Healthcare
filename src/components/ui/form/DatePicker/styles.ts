import { useTheme } from "@/contexts/ThemeContext";
import { scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";
import { Theme } from "react-native-calendars/src/types";

const useStyles = (error?: boolean) => {
  const { theme } = useTheme();

  return StyleSheet.create({
    icon: {
      position: "absolute",
      top: error ? "35%" : "43%",
      right: scale(15),
      zIndex: 333,
    },
    colorIcon: {
      color: theme.colors.secondary,
    },
    input: {
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(9),
      paddingRight: verticalScale(40),
      borderRadius: scale(10),
      borderWidth: error ? 2 : 1,
      borderColor: error ? theme.colors.error : theme.colors.gray,
      color: theme.colors.blackText,
      fontSize: scale(15),
    },
    label: {
      fontSize: scale(13),
      fontWeight: "normal",
      marginBottom: verticalScale(6),
      color: error ? theme.colors.error : theme.colors.black,
    },
    iconRight: {
      position: "absolute",
      right: scale(14),
      top: "30%",
    },
    placeholder: {
      color: theme.colors.gray,
    },
    modal: {
      height: "100%",
      backgroundColor: theme.colors.surfaceContainer,
    },
    headers: {
      paddingHorizontal: scale(15),
      paddingBottom: scale(15),
      marginTop: verticalScale(21),
      borderBottomColor: theme.colors.gray,
      borderBottomWidth: 1,
    },
    header1: {
      padding: scale(15),
    },
    textHeader1: {
      color: theme.colors.blackText,
    },
    textHeader: {
      lineHeight: 40,
      fontSize: scale(30),
      color: theme.colors.blackText,
    },
    actions: {
      margin: scale(15),
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexDirection: "row",
      gap: 5,
    },
  });
};

export const useThemeDatePicker = (): Theme => {
  const { theme } = useTheme();

  return {
    calendarBackground: theme.colors.surfaceContainer,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.white,
    arrowColor: theme.colors.black,
    monthTextColor: theme.colors.black,
    textDayFontWeight: "500",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    todayBackgroundColor: theme.colors.gray,
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 12,
    textDayStyle: {
      color: theme.colors.black,
    },
    textDisabledColor: "gray",
    todayTextColor: theme.colors.black,
  };
};

export default useStyles;
