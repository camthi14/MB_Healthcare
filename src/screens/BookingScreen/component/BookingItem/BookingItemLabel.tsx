import { StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import { verticalScale } from "@/utils/scale";

type BookingItemLabelProps = {
  label: string;
  value: string;
  color?: string;
};

const BookingItemLabel: FC<BookingItemLabelProps> = ({ label, value, color }) => {
  const styles = useStyles(color);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    </View>
  );
};

export default memo(BookingItemLabel);

const useStyles = (color?: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: verticalScale(4),
    },
    textValue: {
      fontWeight: "700",
      ...(color ? { color: color } : {}),
    },
  });
};
