import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { StyleSheet } from "react-native";

const SPACING_ICON = 50;
const SPACING_ROUND = 130;
const SPACING_CIRCLE_V1 = 20;
const SPACING_CIRCLE_V2 = 15;
const SPACING_CIRCLE_V3 = 8;
const SPACING_CIRCLE_V4 = 5;
const SPACING_CIRCLE_V5 = 3;
const SPACING_CIRCLE_V6 = SPACING_CIRCLE_V5;
const SPACING_CIRCLE_V7 = SPACING_CIRCLE_V4;
const SPACING_CIRCLE_V8 = SPACING_CIRCLE_V3;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    p: {
      paddingHorizontal: scale(30),
    },
    roundedIcon: {
      width: SPACING_ROUND,
      height: SPACING_ROUND,
      borderRadius: SPACING_ROUND / 2,
      backgroundColor: ColorSchemas.green,
    },
    wrapperIcon: {
      width: SPACING_ICON,
      height: SPACING_ICON,
      backgroundColor: ColorSchemas.white,
      borderRadius: scale(10),
    },
    iconColor: {
      color: ColorSchemas.green,
    },
    iconSize: {
      fontSize: 25,
    },
    circleV1TopLeft: {
      width: SPACING_CIRCLE_V1,
      height: SPACING_CIRCLE_V1,
      borderRadius: SPACING_CIRCLE_V1 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      top: -20,
      left: -20,
    },
    circleV2TopRight: {
      width: SPACING_CIRCLE_V2,
      height: SPACING_CIRCLE_V2,
      borderRadius: SPACING_CIRCLE_V2 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      top: 0,
      right: -25,
    },
    circleV3BottomLeft: {
      width: SPACING_CIRCLE_V3,
      height: SPACING_CIRCLE_V3,
      borderRadius: SPACING_CIRCLE_V3 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      bottom: 20,
      left: -20,
    },
    circleV3BottomLeftV2: {
      width: SPACING_CIRCLE_V4,
      height: SPACING_CIRCLE_V4,
      borderRadius: SPACING_CIRCLE_V4 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      bottom: -20,
      left: 20,
    },
    circleV5BottomCenter: {
      width: SPACING_CIRCLE_V5,
      height: SPACING_CIRCLE_V5,
      borderRadius: SPACING_CIRCLE_V5 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      bottom: -10,
      right: 50,
    },
    circleV6TopBottomRightCenter: {
      width: SPACING_CIRCLE_V4,
      height: SPACING_CIRCLE_V4,
      borderRadius: SPACING_CIRCLE_V4 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      bottom: 50,
      right: -10,
    },
    circleV7TopRightLeftCenter: {
      width: SPACING_CIRCLE_V7,
      height: SPACING_CIRCLE_V7,
      borderRadius: SPACING_CIRCLE_V7 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      top: -15,
      right: 50,
    },
    circleV8BottomRight: {
      width: SPACING_CIRCLE_V8,
      height: SPACING_CIRCLE_V8,
      borderRadius: SPACING_CIRCLE_V8 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      bottom: 0,
      right: -4,
    },
    circleV9TopBottomLeftCenter: {
      width: SPACING_CIRCLE_V6,
      height: SPACING_CIRCLE_V6,
      borderRadius: SPACING_CIRCLE_V6 / 2,
      backgroundColor: ColorSchemas.green,
      position: "absolute",
      top: 50,
      left: -18,
    },
    spacingY: {
      marginVertical: verticalScale(15),
    },
    title: {
      ...textStyles.H3,
      color: ColorSchemas.green,
      fontWeight: "bold",
      letterSpacing: 0.2,
    },
    spacingYBtn: {
      marginVertical: verticalScale(4),
    },
    subTitle: {
      ...textStyles.H5,
      textAlign: "center",
    },
  });
};

export default useStyles;
