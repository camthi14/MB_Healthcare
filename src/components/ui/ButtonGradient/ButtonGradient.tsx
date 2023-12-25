import { TextStyleProp, ViewStyleProp } from "@/types/style";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Button } from "react-native-paper";

interface ButtonGradientProps {
  onPress?: () => void;
  text: string;
  color?: string[];
  loading?: boolean;
  disabled?: boolean;
  borderRadius?: number;
  contentStyle?: ViewStyleProp;
  labelStyle?: TextStyleProp;
}

const ButtonGradient: React.FC<ButtonGradientProps> = ({
  color,
  onPress,
  text,
  disabled,
  loading,
  contentStyle,
  labelStyle,
  borderRadius,
}) => {
  return (
    <LinearGradient
      colors={color ?? ["#3F5BEE", "rgba(34, 193, 195, 1)"]}
      end={{ x: 1.2, y: 1.2 }}
      start={{ x: 0, y: 1.2 }}
      style={{
        borderRadius: borderRadius ?? 40,
      }}
    >
      <Button
        loading={loading}
        disabled={disabled}
        onPress={onPress}
        contentStyle={contentStyle}
        labelStyle={labelStyle}
      >
        {text}
      </Button>
    </LinearGradient>
  );
};

export default ButtonGradient;
