import Container from "@/components/shared/Container";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import Alert from "@/components/ui/Alert";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { useBooking } from "@/features/booking";
import { bookingActions } from "@/features/booking/bookingSlice";
import { usePatient } from "@/features/patient/patientSelector";
import { patientActions } from "@/features/patient/patientSlice";
import { IPatient } from "@/models/patient.model";
import { useAppDispatch } from "@/stores/hooks";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./BookingSelectPatientStyles";
import PatientItem, { PatientItemProps } from "./components/PatientItem";
import ProfileItemPatient from "./components/ProfileItemPatient";

const BookingSelectPatientScreen: FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [idSelected, setIdSelected] = useState<string>("");
  const lastPatients = useRef<IPatient[]>([]);

  const { userId } = useAuth();
  const { data: accounts } = usePatient();
  const { selectedPatient: selected, bookingAtHome } = useBooking();

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      dispatch(appActions.setLoading(true));
      dispatch(patientActions.getRelationshipStart(String(userId)));
    }, [userId])
  );

  useLayoutEffect(() => {
    if (!accounts) return;

    const _patients: IPatient[] = [accounts];

    let mounted = false;

    if (accounts?.relatives) {
      const { relatives } = accounts;
      _patients.push(...relatives);
    }

    if (!mounted) {
      setPatients(_patients);

      lastPatients.current = _patients;
    }

    return () => {
      mounted = true;
    };
  }, [accounts, lastPatients]);

  const handleOnPressSelect = useCallback((select: IPatient) => {
    dispatch(bookingActions.setSelectedPatient(select));
    setIdSelected(select?.id!);
  }, []);

  const onPressSesAll = useCallback(() => {
    if (!lastPatients.current) return;
    setPatients(lastPatients.current);
    setIdSelected("");
    dispatch(bookingActions.setSelectedPatient(null));
  }, [lastPatients]);

  const handleSelectedId = useCallback(
    (id: string) => {
      setIdSelected(id);
      dispatch(bookingActions.setSelectedPatient(null));
      let _patients = [...lastPatients.current];
      _patients = _patients.filter((p) => p.id === id);
      dispatch(bookingActions.setSelectedPatient(_patients[0]));
      setPatients(_patients);
    },
    [lastPatients]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PatientItemProps>) => {
      return (
        <PatientItem
          onPressSelectedId={handleSelectedId}
          active={idSelected === item?.id}
          {...item}
        />
      );
    },
    [idSelected]
  );

  const onPressAddPatient = useCallback(() => {
    navigation.navigate("AddRelationship");
  }, []);

  const renderListComponentHeader = useCallback(() => {
    return (
      <TouchableOpacity onPress={onPressAddPatient} style={styles.addBtn}>
        <AntDesign name="addusergroup" size={24} color="black" />
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item: PatientItemProps, _: number) => item.id!, []);

  // console.log(`bookingAtHome`, bookingAtHome);

  const handleSubmit = useCallback(() => {
    if (!selected) {
      dispatch(
        appActions.setSnackbar({ open: true, text: "Vui lòng chọn bệnh nhân", type: "error" })
      );
      return;
    }

    dispatch(bookingActions.setSelectedPatient(selected));

    if (bookingAtHome) {
      navigation.navigate("BookingSelectSpecialty");
    } else {
      navigation.navigate("BookingSelect");
    }
  }, [selected, bookingAtHome]);

  const handleRefreshing = useCallback(() => {
    if (!userId) return;

    dispatch(appActions.setLoading(true));
    dispatch(patientActions.getRelationshipStart(String(userId)));
  }, [userId]);

  return (
    <Container>
      <AppbarOverride title="Chọn hồ sơ" isGoBack isHome resetBooking />

      <ScrollView>
        <View style={styles.wrapperView}>
          <View style={styles.spacing}>
            <Alert text="Chọn 1 trong các hồ sơ, hoặc bấm nút Tạo hồ sơ ở bên dưới để thêm hồ sơ đặt khám" />
          </View>

          <View style={styles.wrapperHeader}>
            <View style={styles.head}>
              <Text variant="labelLarge">Hồ sơ gia đình</Text>
              <Pressable onPress={onPressSesAll}>
                <Text style={styles.headRightText} variant="labelLarge">
                  Xem tất cả
                </Text>
              </Pressable>
            </View>

            <View style={styles.wrapperPatient}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={handleRefreshing}
                    tintColor="#F8852D"
                  />
                }
                refreshing={false}
                onRefresh={handleRefreshing}
                horizontal
                ListHeaderComponent={renderListComponentHeader}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.m} />}
                data={lastPatients.current}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </View>
          </View>

          <View style={styles.wrapperProfile}>
            <Text variant="labelLarge">Hồ sơ đặt khám</Text>

            <View>
              {patients?.length
                ? patients.map((t, index) => (
                    <ProfileItemPatient
                      onPressSelected={handleOnPressSelect}
                      selected={selected?.id === t.id}
                      key={index}
                      {...t}
                    />
                  ))
                : null}
            </View>
          </View>
        </View>
      </ScrollView>

      <SurfaceButton onPress={handleSubmit} label="Tiếp tục" />
    </Container>
  );
};

export default BookingSelectPatientScreen;
