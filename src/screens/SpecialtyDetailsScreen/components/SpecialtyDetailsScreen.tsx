import Container from "@/components/shared/Container";
import { BLUR_HASH } from "@/constants/common";
import { appActions } from "@/features/app";
import { useSpecialty } from "@/features/specialty/specialtySelector";
import { specialtyActions } from "@/features/specialty/specialtySlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { SCREEN_WIDTH, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import React, { FC, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Text } from "react-native-paper";
import HeaderSpecialty from "./HeaderSpecialty";

type SpecialtyDetailsScreenProps = {};

const SpecialtyDetailsScreen: FC<SpecialtyDetailsScreenProps> = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const { params } = useRoute<RouteProp<RootStackParamList, "SpecialtyDetails">>();
  const { dataSingle: selected } = useSpecialty();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.id) return;
    dispatch(appActions.setLoading(true));
    dispatch(specialtyActions.getDataSingleStart(params.id));
  }, [params]);

  return (
    <Container>
      <HeaderSpecialty scrollA={offset} title={selected ? selected?.name : ""} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
          useNativeDriver: true,
        })}
      >
        <View style={{ height: 10000 }}>
          <ImageBackground
            source={selected?.photo}
            placeholder={BLUR_HASH}
            style={{ width: SCREEN_WIDTH, height: scale(250) }}
            contentFit="cover"
            transition={500}
          />

          <Text>{selected?.name}</Text>
          <Text>{selected?.desc}</Text>
        </View>
      </Animated.ScrollView>
    </Container>
  );
};

export default SpecialtyDetailsScreen;
