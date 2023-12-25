import { Foundation } from "@expo/vector-icons";
import React, { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./AlertStyles";

type AlertProps = {
  icon?: ReactNode;
  text: string;
  color?: string;
  background?: string;
  borderColor?: string;
};

const Alert: FC<AlertProps> = ({
  icon = <Foundation name="lightbulb" size={18} color="black" />,
  text,
  color,
  background,
  borderColor,
}) => {
  const styles = useStyles({ background, borderColor, color });

  return (
    <View style={styles.guildSelectTime}>
      <Text variant="labelSmall" style={[styles.italic, styles.guildSelectTimeText]}>
        {icon} {text}
      </Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({});
