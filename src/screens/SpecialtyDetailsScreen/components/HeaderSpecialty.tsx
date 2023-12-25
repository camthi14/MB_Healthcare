import { Animated, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { scale, verticalScale } from "@/utils/scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useGoBack from "@/hooks/useGoBack";
import { Ionicons } from "@expo/vector-icons";
import useStyles from "../HeaderSpecialtyStyles";

type HeaderSpecialtyProps = {
  scrollA: Animated.Value;
  title: string;
};

const _headerMaxHeight = verticalScale(50);

const HeaderSpecialty: FC<HeaderSpecialtyProps> = ({ scrollA, title }) => {
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

export default HeaderSpecialty;

const styles = StyleSheet.create({});
