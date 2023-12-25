import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { useExaminationCard } from "@/features/examinationCard/examinationCardSelector";
import { examinationCardActions } from "@/features/examinationCard/examinationCardSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { SPACING } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ExaminationCard from "./components/ExaminationCard";

const DetailsExaminationScreen: FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const { dataSingle, booking, billExists, detailsExists, prescriptionExists } =
    useExaminationCard();

  const {
    params: { bookingId },
  } = useRoute<RouteProp<RootStackParamList, "DetailsExamination">>();

  useEffect(() => {
    if (!bookingId) return;
    dispatch(appActions.setLoading(true));
    dispatch(examinationCardActions.getByBookingIdStart(bookingId));
  }, [bookingId]);

  return (
    <Container>
      <AppbarOverride title="Chi tiết" isGoBack />

      <ScrollView>
        <View style={styles.container}>
          <ExaminationCard
            billExists={billExists}
            detailsExists={detailsExists}
            prescriptionExists={prescriptionExists}
            booking={booking}
            data={dataSingle}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default DetailsExaminationScreen;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      padding: SPACING,
      marginBottom: 100,
    },
  });
};
