import React, { FC, useCallback } from "react";
import { Pressable, Text } from "react-native";
import useStyles from "./TimeItemStyles";
import { IHourObject } from "@/models/scheduleDoctor.model";

type TimeItemProps = {
  onPress?: (row: IHourObject) => void;
  text: string;
  id?: string;
  active?: boolean;
  row: IHourObject;
  disabled?: boolean;
};

const TimeItem: FC<TimeItemProps> = ({ text, active, disabled, row, onPress }) => {
  const styles = useStyles({ active, disabled });

  const handleOnPress = useCallback(() => {
    if (!onPress) return;
    onPress(row);
  }, [row, onPress]);

  return (
    <Pressable onPress={disabled ? undefined : handleOnPress} style={styles.item}>
      <Text style={styles.itemText}>{text}</Text>
    </Pressable>
  );
};

export default TimeItem;
