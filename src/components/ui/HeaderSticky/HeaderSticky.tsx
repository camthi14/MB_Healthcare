import useGoBack from "@/hooks/useGoBack";
import { scale, verticalScale } from "@/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Animated, Pressable, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStyles from "./HeaderStickyStyles";

type HeaderStickyProps = {
  scrollA: Animated.Value;
  title: string;
};

const _headerMaxHeight = verticalScale(50);

const HeaderSticky: FC<HeaderStickyProps> = ({ scrollA, title }) => {
  const isFloating = useMemo(() => !!scrollA, [scrollA]);
  const [isTransparent, setTransparent] = useState<boolean>(isFloating);
  const styles = useStyles(isFloating, _headerMaxHeight, isTransparent);
  const safeArea = useSafeAreaInsets();
  const { onGoBack } = useGoBack();

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener((a) => {
      const offset = scale(250) - _headerMaxHeight - safeArea.top;
      isTransparent !== a.value < offset && setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <Pressable onPress={onGoBack} style={styles.icon}>
          <Ionicons name="arrow-back-outline" size={25} color={isTransparent ? "white" : "black"} />
        </Pressable>

        <View>
          <Animated.Text style={styles.title} numberOfLines={1}>
            {title}
          </Animated.Text>
        </View>
      </View>
    </>
  );
};

export default HeaderSticky;
