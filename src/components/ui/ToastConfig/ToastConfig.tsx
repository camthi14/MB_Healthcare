import { useTheme } from "@/contexts/ThemeContext";
import { scale, verticalScale } from "@/utils/scale";
import { BaseToast, BaseToastProps, ErrorToast, InfoToast } from "react-native-toast-message";
import { Dimensions, StatusBar } from "react-native";

const { width } = Dimensions.get("window");

const toastConfig = () => {
  const { theme } = useTheme();

  const spacing = {
    paddingHorizontal: scale(2),
    paddingVertical: verticalScale(0),
    minHeight: verticalScale(60),
    top: scale(StatusBar.currentHeight! - 10),
    width: scale(width - 80),
  };

  const text1FontSize = 18;
  const text2FontSize = 16;

  return {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#54B435",
          ...spacing,
        }}
        text1Style={{
          fontSize: text1FontSize,
        }}
        text2Style={{
          fontSize: text2FontSize,
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: theme.colors.notification,
          ...spacing,
        }}
        text1Style={{
          fontSize: text1FontSize,
        }}
        text2Style={{
          fontSize: text2FontSize,
        }}
      />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast
        {...props}
        style={{
          borderLeftColor: theme.colors.primary,
          ...spacing,
        }}
        text1Style={{
          fontSize: text1FontSize,
        }}
        text2Style={{
          fontSize: text2FontSize,
        }}
      />
    ),
    warning: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#F9D923",
          ...spacing,
        }}
        text1Style={{
          fontSize: text1FontSize,
        }}
        text2Style={{
          fontSize: text2FontSize,
        }}
      />
    ),
  };
};

export default toastConfig;
