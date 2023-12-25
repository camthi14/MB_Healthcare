import React, { FC } from "react";
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import useStyles from "./styles";
import { verticalScale } from "@/utils/scale";
import HelperText from "../Input/HelperText";
import { Feather } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

export type InputLabelProps = {
  isSecure?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  label: string;
  margin?: number;
  uppercaseLabel?: boolean;
  fontBoldLabel?: boolean;
} & TextInputProps;

const InputLabel: FC<InputLabelProps> = ({
  label,
  margin,
  error,
  helperText,
  isSecure,
  uppercaseLabel,
  fontBoldLabel,
  ...props
}) => {
  const styles = useStyles({ error, fontBoldLabel, uppercaseLabel });
  const [show, setShow] = React.useState(false);

  const iconRight = React.useMemo(
    () => () => {
      if (isSecure) {
        return (
          <Animated.View style={styles.iconRight}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setShow((prev) => !prev)}>
              <Feather
                name={show ? "eye-off" : "eye"}
                size={24}
                color={error ? COLORS.RedInput : COLORS.Gray}
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
    <View style={{ marginBottom: margin ?? verticalScale(15) }}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View style={{ position: "relative" }}>
        <TextInput
          style={styles.input}
          {...props}
          secureTextEntry={isSecure ? (show ? false : true) : false}
          placeholderTextColor={styles.placeholder.color}
        />
        {iconRight()}
      </Animated.View>

      {helperText && (
        <View style={{ marginTop: 5 }}>
          <HelperText
            type={helperText && error ? "error" : "info"}
            visible={(helperText ? true : false) || error}
            text={helperText}
          />
        </View>
      )}
    </View>
  );
};

export default InputLabel;
