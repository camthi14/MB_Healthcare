import doctors from "@/mock/doctor";
import { IDoctorResponse } from "@/models/doctor.model";
import { IHourObject } from "@/models/scheduleDoctor.model";
import { Loading } from "@/types/common";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { intervalToDuration } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { createHour } from "./createHour";
import { formatDate } from "@/helpers/date.helper";
import { useAppDispatch } from "@/stores/hooks";
import { appActions } from "@/features/app";
import { bookingActions } from "@/features/booking/bookingSlice";

export const useGetDoctorId = (duration: number = 0) => {
  const { params } = useRoute<RouteProp<RootStackParamList, "DoctorDetails">>();
  const [doctor, setDoctor] = useState<IDoctorResponse | null>(null);
  const [loading, setLoading] = useState<Loading>("ready");
  const [hours, setHours] = useState<IHourObject[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<IHourObject | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const calcHours = (doctor: IDoctorResponse) => {
    const { specialtyData, scheduleToday } = doctor;

    if (!specialtyData) return;

    const { time_chekup_avg } = specialtyData;
    const {
      sessionData: { time_end, time_start },
    } = scheduleToday;

    const start = new Date(time_start);
    const end = new Date(time_end);
    const totalTimers = intervalToDuration({ end, start });

    const shiftCheckup = (totalTimers.hours! * 60 + totalTimers.minutes!) / time_chekup_avg;

    let results: never[] = [];

    const shifts = createHour({
      hourStart: start.getHours(),
      minuteStart: start.getMinutes(),
      shifts: [...Array(shiftCheckup)],
      timeCheckupAvg: time_chekup_avg,
      results,
    });

    const hours: IHourObject[] = shifts.map((shift, index) => ({
      id: index + 1,
      is_booked: false,
      time_end: shift.end,
      time_start: shift.start,
    }));

    setHours(hours);
  };

  useEffect(() => {
    if (!params.id) return;

    setLoading("pending");

    const result = doctors.find((d) => d.id === params.id);

    if (!result) {
      setLoading("failed");
      return;
    }

    calcHours(result);

    const timeOutId = setTimeout(() => {
      setLoading("complete");
      setDoctor(result);
    }, duration);

    return () => clearTimeout(timeOutId);
  }, [params, duration]);

  const onChangeDate = useCallback(
    (text: string) => {
      if (!doctor) return;
      const date = new Date(text);
      setDate(date);

      const newDoctor = { ...doctor };
      const { schedules } = newDoctor;

      const filterSchedules = schedules.find((t) => formatDate(t.date) === formatDate(date));

      if (!filterSchedules) {
        setHours([]);
        return;
      }

      newDoctor.scheduleToday = filterSchedules;
      calcHours(newDoctor);
      setDoctor(newDoctor);
    },
    [doctor]
  );

  const onSelectedHour = useCallback(
    (id: number) => {
      const hour = hours.find((h) => h.id === id);
      if (!hour) return;
      setSelectedHour(hour);
    },
    [hours]
  );

  const onBooking = useCallback(() => {
    if (!date || !selectedHour) {
      dispatch(
        appActions.setSnackbar({ open: true, text: "Vui lòng chọn ngày giờ khám", type: "error" })
      );
      return;
    }

    dispatch(
      bookingActions.setBookingInDoctorDetails({ dateSelectedBooking: date, hour: selectedHour })
    );

    dispatch(bookingActions.setSelectedDoctor(doctor));

    navigation.navigate("BookingSelectPatient");
  }, [date, selectedHour]);

  return {
    params,
    doctor,
    loading,
    hours,
    date,
    selectedHour,
    onChangeDate,
    onSelectedHour,
    onBooking,
  };
};
