import React from "react";
import { TextStyleProp } from "@/types/style";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface TextGradientProps {
  text: string;
  height: number;
  style?: TextStyleProp;
  color?: string[];
  variant?: VariantProp<never>;
}

const TextGradient: React.FC<TextGradientProps> = ({ text, height, style, color, variant }) => {
  return (
    <MaskedView
      style={{ height: height }}
      maskElement={
        <Text variant={variant} style={style}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={color ?? ["#3f5bee", "rgba(34, 193, 195, 5)"]}
        start={{ x: 1, y: 1.5 }}
        end={{ x: 0, y: 0.5 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

export default TextGradient;
