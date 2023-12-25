import { Entypo } from "@expo/vector-icons";
import React, { FC, ReactNode } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LabelItemIconProps = {
  label: string;
  children: ReactNode;
  onPress?: () => void;
  color?: string;
  isShowIcon?: boolean;
};

const LabelItemIcon: FC<LabelItemIconProps> = ({
  label,
  children,
  onPress,
  isShowIcon = true,
  color,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles.flexRow]}>
      <View>{children}</View>
      <View style={[styles.flexRow, styles.content]}>
        <Text style={[styles.textContent, color ? { color: color } : {}]}>{label}</Text>
        {isShowIcon ? (
          <Pressable onPress={onPress}>
            <Entypo name="chevron-right" size={24} color="grey" />
          </Pressable>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default LabelItemIcon;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    gap: 15,
  },
  content: {
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  textContent: {
    fontSize: 15,
    fontWeight: "700",
  },
});
