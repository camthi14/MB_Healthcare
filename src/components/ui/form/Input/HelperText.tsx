import React from "react";
import { Text, View } from "react-native";
import useStyles from "./style";

type HelperTextProps = {
  type: "info" | "error";
  text: React.ReactNode;
  visible?: boolean;
  fontSize?: "Small" | "Normal" | "H5" | "H4";
};

const HelperText: React.FC<HelperTextProps> = ({ type, text, visible, fontSize }) => {
  const styles = useStyles(fontSize);

  if (!visible) return null;

  return (
    <View>
      <Text style={[type === "error" ? styles.helperError : styles.helperInfo]}>{text}</Text>
    </View>
  );
};

export default HelperText;
