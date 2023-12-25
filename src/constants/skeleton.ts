import { FadeIn, Layout } from "react-native-reanimated";

export const SkeletonProps = {
  colorMode: "light",
  transition: { type: "timing", duration: 300 },
} as const;

export const TransitionProps = {
  layout: Layout,
  entering: FadeIn.duration(300),
} as const;
