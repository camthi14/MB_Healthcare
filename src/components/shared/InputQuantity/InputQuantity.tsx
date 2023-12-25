import { Entypo } from "@expo/vector-icons";
import React, { FC, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import useStyles from "./InputQuantityStyles";

type InputQuantityProps = {
  value: number;
  minValue?: number;
  onChange?: (newValue: number) => void;
};

const InputQuantity: FC<InputQuantityProps> = ({ value, minValue = 0, onChange }) => {
  const styles = useStyles();

  const onIncrease = useCallback(() => {
    if (!onChange) return;
    onChange(value + 1);
  }, [value, onChange]);

  const onDecrease = useCallback(() => {
    if (!onChange) return;
    onChange(Math.max(minValue, value - 1));
  }, [value, minValue, onChange]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.action} onPress={onDecrease}>
        <Entypo name="minus" size={24} color={styles.colorIcon.color} />
      </Pressable>
      <View>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Pressable style={styles.action} onPress={onIncrease}>
        <Entypo name="plus" size={24} color={styles.colorIcon.color} />
      </Pressable>
    </View>
  );
};

export default InputQuantity;
