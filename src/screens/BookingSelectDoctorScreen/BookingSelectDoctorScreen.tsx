import Container from "@/components/shared/Container";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { bookingActions, useBooking } from "@/features/booking";
import { useDoctor } from "@/features/doctor/doctirSelector";
import { doctorActions } from "@/features/doctor/doctorSlice";
import { IDoctorResponse } from "@/models/doctor.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { verticalScale } from "@/utils/scale";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import BookingDoctorItem from "./component/BookingSpecialtyItem/BookingDoctorItem";

const BookingSelectDoctorScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useDoctor();
  const { specialtySelected, selectedDoctor } = useBooking();

  useFocusEffect(
    useCallback(() => {
      if (!specialtySelected) {
        navigate("BookingSelectSpecialty");
        return;
      }

      dispatch(appActions.setLoading(true));
      dispatch(doctorActions.getDataStart({ speciality_id: specialtySelected.id }));
    }, [specialtySelected])
  );

  const handleSelected = useCallback((row: IDoctorResponse) => {
    dispatch(bookingActions.setSelectedDoctor(row));
  }, []);

  const keyExtractor = useCallback((item: IDoctorResponse, index: number) => `${item.id}`, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IDoctorResponse>) => (
      <BookingDoctorItem
        row={item}
        checked={selectedDoctor?.id === item.id}
        onSelected={handleSelected}
      />
    ),
    [selectedDoctor]
  );

  const handleSelectedDoctor = useCallback(() => {
    if (!selectedDoctor) {
      dispatch(appActions.setSnackbar({ open: true, text: "Vui lòng chọn bác sĩ", type: "error" }));
      return;
    }

    navigate("BookingSelectScheduleDoctor");
  }, [selectedDoctor]);

  return (
    <Container>
      <AppbarOverride title="Chọn Bác sĩ" isGoBack isHome resetBooking />

      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ marginBottom: verticalScale(5) }} />}
        />
      </View>

      <SurfaceButton label="Tiếp tục" onPress={handleSelectedDoctor} />
    </Container>
  );
};

export default BookingSelectDoctorScreen;
