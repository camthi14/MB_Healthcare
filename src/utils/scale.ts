import { Dimensions, StatusBar } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const statusBarHeight = (height = 10) => verticalScale(StatusBar.currentHeight! + height);
const SPACING = scale(10);
const MARGIN_BOTTOM_NAV = verticalScale(30);

export {
  scale,
  verticalScale,
  moderateScale,
  statusBarHeight,
  SPACING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  MARGIN_BOTTOM_NAV,
};
