import COLORS from "@/constants/colors";
import { ViewStyleProp } from "@/types/style";
import { scale } from "@/utils/scale";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import HelperText from "./HelperText";
import useStyles from "./style";

type InputProps = {
  isSecure?: boolean;
  helperText?: React.ReactNode;
  styleView?: ViewStyleProp;
  label: string;
  error?: boolean;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  isSecure,
  value,
  helperText,
  styleView,
  label,
  error,
  onBlur,
  ...props
}) => {
  const [show, setShow] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const styles = useStyles();
  const [zoomAnim] = React.useState(new Animated.Value(0));
  const [size, setSize] = React.useState(1);

  const renderLabel = React.useMemo(
    () => () => {
      if (value || isFocus) {
        return (
          <Text
            style={[
              styles.label,
              { backgroundColor: COLORS.White },
              error
                ? { color: COLORS.Red }
                : isFocus
                ? { color: COLORS.BackgroundLabel }
                : { color: COLORS.Black },
            ]}
          >
            {label}
          </Text>
        );
      }

      return null;
    },
    [value, isFocus, label]
  );

  const handleBlur = React.useCallback(
    (e: any) => {
      setIsFocus(false);
      if (!onBlur) return;
      onBlur(e);
    },
    [onBlur]
  );

  const handleFocus = React.useCallback(() => {
    setIsFocus(true);
    setSize(2);
  }, []);

  React.useEffect(() => {
    Animated.timing(zoomAnim, {
      toValue: size,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [size]);

  React.useLayoutEffect(() => {
    if (!error) return;
    setSize(2);
  }, [error]);

  const iconRight = React.useMemo(
    () => () => {
      if (isSecure) {
        return (
          <Animated.View style={styles.iconRight}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setShow((prev) => !prev)}>
              <Feather
                name={show ? "eye-off" : "eye"}
                size={24}
                color={error ? COLORS.Red : COLORS.Gray}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      }

      return null;
    },
    [isSecure, show]
  );

  return (
    <View style={styleView}>
      <Animated.View
        style={[
          styles.groupInput,

          { borderWidth: size },
          error
            ? { borderWidth: size, borderColor: COLORS.Red }
            : isFocus && { borderWidth: size, borderColor: COLORS.BackgroundLabel },
        ]}
      >
        {renderLabel()}

        <Animated.View>
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={error ? COLORS.Red : COLORS.Secondary}
            secureTextEntry={isSecure ? (show ? false : true) : false}
            style={[isSecure && { paddingRight: scale(22) }]}
            {...props}
          />

          {iconRight()}
        </Animated.View>
      </Animated.View>

      {helperText && (
        <HelperText
          type={helperText && error ? "error" : "info"}
          visible={(helperText ? true : false) || error}
          text={helperText}
        />
      )}
    </View>
  );
};

export default Input;
