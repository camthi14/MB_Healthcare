import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { usePatient } from "@/features/patient/patientSelector";
import { patientActions } from "@/features/patient/patientSlice";
import { BillType } from "@/models/bill.model";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { SPACING, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList, RefreshControl, SectionListRenderItemInfo, View } from "react-native";
import BillItem from "./components/BillItem/BillItem";

const SeeBillScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { bills } = usePatient();

  const {
    params: { examCardId },
  } = useRoute<RouteProp<RootStackParamList, "SeeBill">>();

  useEffect(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getBillStart(examCardId));
  }, [examCardId]);

  const renderItem = useCallback(
    ({ item }: SectionListRenderItemInfo<BillType>) => <BillItem data={item} />,
    []
  );

  const keyExtractor = useCallback((item: BillType, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!examCardId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getBillStart(examCardId));
  }, [examCardId]);

  return (
    <Container>
      <AppbarOverride title="Hóa đơn" isGoBack />

      <View style={{ flex: 1, padding: SPACING }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          data={bills}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: scale(4) }} />}
        />
      </View>
    </Container>
  );
};

export default SeeBillScreen;
