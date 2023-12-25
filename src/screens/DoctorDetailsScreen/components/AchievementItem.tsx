import React, { FC, ReactNode, memo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./AchievementStyles";

export type AchievementItemProps = {
  icon: ReactNode;
  total: number;
  text: string;
  format?: (value: string | number) => string;
};

export const AchievementItem: FC<AchievementItemProps> = memo(({ icon, format, text, total }) => {
  const styles = useStyles();

  return (
    <View style={styles.item}>
      <View style={styles.itemWrapperIcon}>{icon}</View>
      <Text variant="labelLarge" style={styles.itemTotal}>
        {format ? format(total) : total}
      </Text>
      <Text variant="labelSmall" style={styles.itemText}>
        {text}
      </Text>
    </View>
  );
});
