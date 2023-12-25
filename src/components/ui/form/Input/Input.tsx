import { ViewStyleProp } from "@/types/style";
import { scale } from "@/utils/scale";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
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
  const theme = useTheme();

  const renderLabel = React.useMemo(
    () => () => {
      if (value || isFocus) {
        return (
          <Text
            style={[
              styles.label,
              { backgroundColor: theme.colors.background },
              error
                ? { color: theme.colors.error }
                : isFocus
                ? { color: theme.colors.primary }
                : { color: theme.colors.secondary },
            ]}
          >
            {label}
          </Text>
        );
      }

      return null;
    },
    [value, isFocus, label, error]
  );

  const handleBlur = React.useCallback(
    (e: any) => {
      setIsFocus(false);
      setSize(1);
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
    if (!error) {
      setSize(1);
      return;
    }
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
                color={error ? theme.colors.error : theme.colors.secondary}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      }

      return null;
    },
    [isSecure, show, error]
  );

  return (
    <View style={styleView}>
      <Animated.View
        style={[
          styles.groupInput,
          { borderWidth: size },
          error
            ? { borderWidth: size, borderColor: theme.colors.error }
            : isFocus
            ? { borderWidth: size, borderColor: theme.colors.primary }
            : { borderWidth: size },
        ]}
      >
        {renderLabel()}

        <Animated.View>
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            value={value}
            placeholderTextColor={error ? theme.colors.error : theme.colors.secondary}
            secureTextEntry={isSecure ? (show ? false : true) : false}
            style={[styles.input, isSecure && { paddingRight: scale(22) }]}
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
