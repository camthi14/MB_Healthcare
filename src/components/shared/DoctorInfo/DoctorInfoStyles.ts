import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const PHOTO_SPACING = scale(80);
const MARGIN_VERTICAL = verticalScale(20);

const useStyles = () => {
  return StyleSheet.create({
    wrapperView: {
      paddingBottom: verticalScale(30),
    },
    wrapperHeader: {
      paddingHorizontal: SPACING,
      paddingVertical: verticalScale(10),
      marginTop: SPACING,
      flexDirection: "row",
      backgroundColor: ColorSchemas.white,
      borderRadius: scale(10),
    },
    wrapperAchievement: {
      flexDirection: "row",
      paddingHorizontal: SPACING,
      marginTop: MARGIN_VERTICAL,
      gap: scale(5),
    },
    guildSelectTime: {
      marginBottom: verticalScale(10),
      borderRadius: scale(3),
      borderWidth: 1,
      borderColor: ColorSchemas.yellowDark,
      padding: SPACING,
      backgroundColor: ColorSchemas.yellowLighter,
    },
    guildSelectTimeText: {
      color: ColorSchemas.black,
      fontWeight: "bold",
    },
    photo: {
      width: PHOTO_SPACING,
      height: PHOTO_SPACING,
      borderRadius: PHOTO_SPACING / 2,
    },
    wrapperDisplayName: {
      marginLeft: scale(8),
      flex: 1,
    },
    displayName: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
      letterSpacing: 0.2,
    },
    my2: {
      marginVertical: verticalScale(2),
    },
    mt2: {},
    likeBtn: {
      marginTop: verticalScale(2),
      backgroundColor: ColorSchemas.blue,
      borderRadius: scale(10),
    },
    labelBtn: {
      paddingVertical: verticalScale(0),
      fontSize: scale(9),
    },
    wrapperCalendar: {
      paddingHorizontal: SPACING,
      marginTop: MARGIN_VERTICAL,
    },
    calendars: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: scale(8),
    },
    wrapperAddress: {
      paddingHorizontal: SPACING,
      marginTop: MARGIN_VERTICAL,
    },
    addressTitleText: {
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    addressTitleTextV2: {
      textTransform: "uppercase",
      marginBottom: verticalScale(5),
    },
    colorRed: {
      color: ColorSchemas.red,
      fontWeight: "bold",
    },
    line: {
      marginVertical: verticalScale(5),
      borderBottomWidth: 1,
      borderColor: ColorSchemas.grey,
    },
    descText: {
      alignItems: "center",
    },
    wrapperText: { position: "relative" },
    press: {
      color: ColorSchemas.blue,
      alignItems: "flex-start",
      paddingVertical: 0,
      marginTop: 10,
      position: "absolute",
      bottom: -5,
      marginLeft: scale(5),
    },
    wrapperHeaderReview: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sesAllBtnText: {
      color: ColorSchemas.blue,
    },
  });
};

export default useStyles;
