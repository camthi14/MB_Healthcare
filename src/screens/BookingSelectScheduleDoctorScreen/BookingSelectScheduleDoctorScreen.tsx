import Container from "@/components/shared/Container";
import DoctorInfo from "@/components/shared/DoctorInfo";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import Alert from "@/components/ui/Alert";
import AppbarOverride from "@/components/ui/AppbarOverride";
import DatePicker from "@/components/ui/form/DatePicker";
import { appActions } from "@/features/app";
import { bookingActions, useBooking } from "@/features/booking";
import { useDoctor } from "@/features/doctor/doctirSelector";
import { doctorActions } from "@/features/doctor/doctorSlice";
import { IHourObject } from "@/models/scheduleDoctor.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { fMoment } from "@/utils/formatTime";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import TimeItem from "../DoctorDetailsScreen/components/TimeItem";
import useStyles from "./BookingSelectScheduleDoctorStyles";

const BookingSelectScheduleDoctorScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { schedules: hours } = useDoctor();
  const { selectedDoctor, hour: selectedHour } = useBooking();
  const [date, setDate] = useState<Date>(new Date());
  const styles = useStyles();

  useFocusEffect(
    useCallback(() => {
      if (!selectedDoctor) {
        navigate("BookingSelectDoctor");
        return;
      }

      dispatch(appActions.setLoading(true));
      dispatch(
        doctorActions.getSchedulesStart({ doctorId: selectedDoctor.id!, date: fMoment(date) })
      );
    }, [selectedDoctor, date])
  );

  const navigationSelectPatient = useCallback(() => {
    if (!selectedDoctor) return;

    if (!selectedHour) {
      dispatch(appActions.setSnackbar({ open: true, text: "Vui lòng chọn giờ", type: "error" }));
      return;
    }

    dispatch(bookingActions.setSelectedDoctor(selectedDoctor));
    navigate("BookingSelect");
  }, [selectedHour, selectedDoctor]);

  const onChangeDate = useCallback((text: string) => {
    const date = new Date(text);
    setDate(date);
  }, []);

  const onSelectedHour = useCallback(
    (selected: IHourObject, order: number) => {
      dispatch(
        bookingActions.setBookingInDoctorDetails({
          hour: selected,
          dateSelectedBooking: fMoment(date, "YYYY-MM-DD"),
          order,
        })
      );
    },
    [date]
  );

  return (
    <Container>
      <AppbarOverride title="Chọn giờ khám bệnh" isGoBack isHome resetBooking />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingBottom: 50 }}>
          <DoctorInfo
            character={selectedDoctor?.qualificationData?.character || ""}
            displayName={selectedDoctor?.display_name || ""}
            specialtyName={selectedDoctor?.specialty?.name || ""}
            desc={
              selectedDoctor?.desc ||
              `15 năm kinh nghiệm trong lĩnh vực ${
                selectedDoctor?.specialty?.name || ""
              }, bác sĩ khoa ${
                selectedDoctor?.specialty?.name || ""
              }, bác sĩ nhận khám bệnh nhân từ 18 tuổi trở lên`
            }
            photo={selectedDoctor?.photo}
          />

          <View style={styles.wrapperCalendar}>
            <View>
              <DatePicker
                uppercaseLabel
                fontBoldLabel
                label="Lịch khám"
                defaultValue={new Date().toString()}
                value={date.toString()}
                onChangeText={onChangeDate}
                isCloseAfterSelect
                minDate={new Date()}
              />
            </View>

            <View style={styles.calendars}>
              {hours.length
                ? hours.map((hour, index) => {
                    if (hour.is_booked || hour.is_cancel || hour.is_over_time || hour.is_remove)
                      return null;

                    return (
                      <TimeItem
                        active={selectedHour?.id === hour.id}
                        key={index}
                        id={hour.id}
                        onPress={(value) => onSelectedHour(value, index + 1)}
                        text={`${hour.time_start} - ${hour.time_end}`}
                        row={hour}
                      />
                    );
                  })
                : null}

              {hours.length &&
              hours.every((t) => t.is_booked || t.is_cancel || t.is_over_time || t.is_remove) ? (
                <View style={{ width: "100%" }}>
                  <Alert text="Ngày này đã hết giờ khám bệnh" />
                </View>
              ) : null}

              {!hours.length ? (
                <View style={{ width: "100%" }}>
                  <Alert icon color="red" text="Ngày này không có lịch khám bệnh" />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>

      <SurfaceButton
        disabled={
          !hours.length ||
          (hours && hours.every((t) => t.is_booked || t.is_cancel || t.is_over_time || t.is_remove))
        }
        label="Tiếp tục"
        onPress={navigationSelectPatient}
      />
    </Container>
  );
};

export default BookingSelectScheduleDoctorScreen;
