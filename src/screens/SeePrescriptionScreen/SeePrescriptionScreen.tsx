import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { usePatient } from "@/features/patient/patientSelector";
import { patientActions } from "@/features/patient/patientSlice";
import { MedicineOptionsInPrescription } from "@/models/prescriptions.model";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { SPACING, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList, RefreshControl, SectionListRenderItemInfo, View } from "react-native";
import HeaderPrescription from "./components/HeaderPrescription";
import PrescriptionItem from "./components/PrescriptionItem";

const SeePrescriptionScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { prescriptions } = usePatient();

  const {
    params: { examCardId },
  } = useRoute<RouteProp<RootStackParamList, "SeePrescription">>();

  useEffect(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getExaminationCardAndDetailsStart(examCardId));
  }, [examCardId]);

  const renderItem = useCallback(
    ({ item, index }: SectionListRenderItemInfo<MedicineOptionsInPrescription>) => (
      <PrescriptionItem data={item} index={index + 1} />
    ),
    []
  );

  const keyExtractor = useCallback((item: MedicineOptionsInPrescription, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getExaminationCardAndDetailsStart(examCardId));
  }, [examCardId]);

  const listHeaderComponent = useCallback(() => {
    if (!prescriptions) return null;

    return <HeaderPrescription data={prescriptions} />;
  }, [prescriptions]);

  return (
    <Container>
      <AppbarOverride title="Toa thuốc" isGoBack />

      <View style={{ flex: 1, padding: SPACING }}>
        <FlatList
          ListHeaderComponent={listHeaderComponent}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          data={prescriptions?.details || []}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: scale(4) }} />}
        />
      </View>
    </Container>
  );
};

export default SeePrescriptionScreen;
