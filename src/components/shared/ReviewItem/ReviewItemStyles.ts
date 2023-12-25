import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { StyleSheet } from "react-native";

const AVATAR_SPACING = 47;

const useStyles = () => {
  return StyleSheet.create({
    reviewContainer: {
      marginTop: verticalScale(8),
      backgroundColor: ColorSchemas.white,
      padding: SPACING,
      borderRadius: scale(8),
    },
    reviewHeader: {
      justifyContent: "space-between",
      flexDirection: "row",
      // alignItems: "center",
    },
    reviewHeaderInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    wrapperInfo: {
      marginLeft: scale(16),
    },
    avatar: {
      width: scale(AVATAR_SPACING),
      height: scale(AVATAR_SPACING),
      borderRadius: scale(AVATAR_SPACING / 2),
    },
    displayName: {
      fontWeight: "bold",
    },
    createdAt: {
      fontSize: scale(10),
      color: ColorSchemas.mutedDark,
      marginTop: verticalScale(1),
    },
    start: {
      fontSize: scale(14),
      color: ColorSchemas.blue,
    },
    textStart: {
      color: ColorSchemas.blue,
      marginLeft: scale(1),
      fontSize: scale(10),
      fontWeight: "bold",
    },
    wrapperStar: {
      flexDirection: "row",
      width: scale(54),
      borderRadius: scale(40),
      paddingVertical: verticalScale(4),
      borderWidth: 2,
      borderColor: ColorSchemas.blue,
      justifyContent: "center",
      alignItems: "center",
    },
    reviewHeaderStar: {},
    reviewContent: {
      marginTop: verticalScale(5),
    },
    reviewContentText: {
      fontWeight: "300",
    },
  });
};

export default useStyles;
