import { useRef } from "react";
import { Animated } from "react-native";

export const useStickyHeader = () => {
  const offset = useRef(new Animated.Value(0)).current;

  return { offset };
};
