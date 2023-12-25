import Container from "@/components/shared/Container";
import Alert from "@/components/ui/Alert";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { bookingActions, useBooking } from "@/features/booking";
import { BookingType } from "@/models/booking.model";
import { useAppDispatch } from "@/stores/hooks";
import { SPACING } from "@/utils/scale";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import moment, { Moment } from "moment";
import React, { FC, useCallback, useState } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, View } from "react-native";
import { Appbar } from "react-native-paper";
import BookingItem from "./component/BookingItem";
import BottomSheetCancel from "./component/BottomSheetCancel";
import BottomSheetDateSearch from "./component/BottomSheetDateSearch";

const BookingScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { historyBooking, isLoading, selectedIdCancel, openCancel } = useBooking();
  const [dateSearch, setDateSearch] = useState<Moment>(moment());
  const [isSearchDate, setIsSearchDate] = useState(false);
  const [show, setShow] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      dispatch(appActions.setLoading(true));

      dispatch(
        bookingActions.getHistoryBookingStart({
          id: userId,
          date: isSearchDate ? dateSearch.format("YYYY-MM-DD") : "",
        })
      );
    }, [userId, isSearchDate, dateSearch])
  );

  const handleCancel = useCallback((values: BookingType) => {
    if (!userId || !values.id) return;

    dispatch(bookingActions.setSelectedIdCancel(values.id));
    dispatch(bookingActions.setToggleOpenCancel(true));
  }, []);

  const handleCloseCancel = useCallback(() => {
    dispatch(bookingActions.setSelectedIdCancel(""));
    dispatch(bookingActions.setToggleOpenCancel(false));
  }, []);

  const handleAgreeCancel = useCallback(() => {
    if (!selectedIdCancel || !userId) return;
    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.cancelStart({ bookingId: selectedIdCancel, patientId: userId }));
  }, [selectedIdCancel, userId]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Readonly<BookingType>>) => {
      return <BookingItem onCancel={handleCancel} loading={isLoading === "pending"} row={item} />;
    },
    [isLoading]
  );

  const keyExtractor = useCallback((item: BookingType, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const handleRefreshing = useCallback(() => {
    if (!userId) return;
    dispatch(appActions.setLoading(true));
    dispatch(bookingActions.getHistoryBookingStart({ id: userId }));
  }, [userId]);

  const handleChangeDateSearch = useCallback((value: Moment) => {
    setShow(false);
    setIsSearchDate(true);
    setDateSearch(value);
  }, []);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Lịch sử đặt" />
        {isSearchDate ? (
          <Appbar.Action
            onPress={() => setIsSearchDate(false)}
            animated={false}
            icon={() => <MaterialIcons name="close" color={ColorSchemas.blue} size={24} />}
          />
        ) : null}
        <Appbar.Action
          animated={false}
          onPress={() => setShow((prev) => true)}
          icon={() => <AntDesign name="calendar" size={24} color={ColorSchemas.mutedDark} />}
        />
      </Appbar.Header>

      <BottomSheetDateSearch
        date={dateSearch}
        visible={show}
        onCancel={() => setShow((prev) => false)}
        onChangeDate={handleChangeDateSearch}
      />

      <BottomSheetCancel
        visible={openCancel}
        onCancel={handleCloseCancel}
        onAgree={handleAgreeCancel}
      />

      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            !historyBooking.length ? (
              <View style={{ padding: SPACING }}>
                <Alert text="Chưa có đặt lịch nào." />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
          }
          refreshing={false}
          onRefresh={handleRefreshing}
          data={historyBooking}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor}
        />
      </View>
    </Container>
  );
};

export default BookingScreen;
