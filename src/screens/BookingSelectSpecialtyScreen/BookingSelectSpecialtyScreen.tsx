import Container from "@/components/shared/Container";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { bookingActions, useBooking } from "@/features/booking";
import { useSpecialty } from "@/features/specialty/specialtySelector";
import { ISpecialist } from "@/models/specialty.model";
import { useAppDispatch } from "@/stores/hooks";
import { verticalScale } from "@/utils/scale";
import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import BookingSpecialtyItem from "./component/BookingSpecialtyItem";
import { navigate } from "@/services/navigation";

const BookingSelectSpecialtyScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useSpecialty();
  const { specialtySelected } = useBooking();

  const handleSelected = useCallback((row: ISpecialist) => {
    dispatch(bookingActions.setSpecialtySelected(row));
  }, []);

  const keyExtractor = useCallback((item: ISpecialist, index: number) => `${item.id}`, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ISpecialist>) => (
      <BookingSpecialtyItem
        row={item}
        checked={specialtySelected?.id === item.id}
        onSelected={handleSelected}
      />
    ),
    [specialtySelected]
  );

  const handleSelectedDoctor = useCallback(() => {
    if (!specialtySelected) {
      dispatch(
        appActions.setSnackbar({ open: true, text: "Vui lòng chọn chuyên khoa", type: "error" })
      );
      return;
    }

    navigate("BookingSelectDoctor");
  }, [specialtySelected]);

  return (
    <Container>
      <AppbarOverride title="Chọn chuyên khoa" isGoBack isHome resetBooking />

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

export default BookingSelectSpecialtyScreen;
