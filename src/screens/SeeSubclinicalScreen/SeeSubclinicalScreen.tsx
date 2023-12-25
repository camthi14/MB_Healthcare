import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { usePatient } from "@/features/patient/patientSelector";
import { patientActions } from "@/features/patient/patientSlice";
import { ExaminationCardsDetailType } from "@/models/examinationCardDetails.model";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { SPACING, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList, RefreshControl, SectionListRenderItemInfo, View } from "react-native";
import SubclinicalItem from "./components/SubclinicalItem";

const SeeSubclinicalScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { examinationCardDetails } = usePatient();

  const {
    params: { examCardId },
  } = useRoute<RouteProp<RootStackParamList, "SeeBill">>();

  // console.log(`examinationCardDetails`, JSON.stringify(examinationCardDetails, null, 4));

  useEffect(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getExaminationCardDetailsStart(examCardId));
  }, [examCardId]);

  const keyExtractor = useCallback((item: ExaminationCardsDetailType, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: SectionListRenderItemInfo<ExaminationCardsDetailType>) => (
      <SubclinicalItem data={item} index={index + 1} />
    ),
    []
  );

  const handleRefreshing = useCallback(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getExaminationCardDetailsStart(examCardId));
  }, [examCardId]);

  return (
    <Container>
      <AppbarOverride title="Chỉ định" isGoBack />

      <View style={{ flex: 1, padding: SPACING }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          data={examinationCardDetails}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: scale(4) }} />}
        />
      </View>
    </Container>
  );
};

export default SeeSubclinicalScreen;
