import Container from "@/components/shared/Container";
import DoctorInfo from "@/components/shared/DoctorInfo";
import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import ReviewItem from "@/components/shared/ReviewItem/ReviewItem";
import Alert from "@/components/ui/Alert";
import AppbarOverride from "@/components/ui/AppbarOverride";
import DatePicker from "@/components/ui/form/DatePicker";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { useBooking } from "@/features/booking";
import { bookingActions } from "@/features/booking/bookingSlice";
import { useDoctor } from "@/features/doctor/doctirSelector";
import { doctorActions } from "@/features/doctor/doctorSlice";
import reviews from "@/mock/review";
import { IHourObject } from "@/models/scheduleDoctor.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { fNumber } from "@/utils/formatNumber";
import { fMoment } from "@/utils/formatTime";
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import useStyles from "./DoctorDetailsScreenStyles";
import { AchievementItem, AchievementItemProps } from "./components/AchievementItem";
import TimeItem from "./components/TimeItem";
import { useShortText } from "./helpers/useShortText";

const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis voluptas mollitia quam cupiditate similique. Non doloremque exercitationem quaerat distinctio iusto labore! Vero quo vitae dolorem voluptate, nihil impedit magni nesciunt? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis voluptas mollitia quam cupiditate similique. Non doloremque exercitationem quaerat distinctio iusto labore! Vero quo vitae dolorem voluptate, nihil impedit magni nesciunt? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis voluptas mollitia quam cupiditate similique. Non doloremque exercitationem quaerat distinctio iusto labore! Vero quo vitae dolorem voluptate, nihil impedit magni nesciunt?`;

const DoctorDetailsScreen: FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>(new Date());

  const { params } = useRoute<RouteProp<RootStackParamList, "DoctorDetails">>();
  const { dataSingle: doctor, isLoading, schedules: hours } = useDoctor();
  const { hour: selectedHour } = useBooking();
  const { onToggleShortText, fullText, shortText } = useShortText(text, 300);

  const achievements = useMemo((): AchievementItemProps[] => {
    return [
      {
        icon: <MaterialIcons name="group" size={24} color={ColorSchemas.blue} />,
        text: "bệnh nhân",
        total: 5000,
      },
      {
        icon: (
          <MaterialCommunityIcons
            name="message-text-clock-outline"
            size={24}
            color={ColorSchemas.blue}
          />
        ),
        text: "kinh nghiệm",
        total: 15,
      },
      {
        icon: <Entypo name="star" size={24} color={ColorSchemas.blue} />,
        text: "đánh giá",
        total: 5.6,
      },
      {
        icon: <AntDesign name="message1" size={24} color={ColorSchemas.blue} />,
        text: "nhận xét",
        total: 5482,
      },
    ];
  }, []);

  useLayoutEffect(() => {
    if (!params.id) return;
    dispatch(appActions.setLoading(true));
    dispatch(doctorActions.getDataSingleStart(params.id));

    return () => {
      dispatch(doctorActions.getDataSingleSuccess(null));
    };
  }, [params]);

  useEffect(() => {
    if (!params.id) return;
    dispatch(appActions.setLoading(true));
    dispatch(doctorActions.getSchedulesStart({ doctorId: params.id, date: fMoment(date) }));
  }, [params, date]);

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

  const navigationSelectPatient = useCallback(() => {
    if (!doctor) return;

    if (!selectedHour) {
      dispatch(appActions.setSnackbar({ open: true, text: "Vui lòng chọn giờ", type: "error" }));
      return;
    }

    dispatch(bookingActions.setBookingAtHome(false));
    dispatch(bookingActions.setSelectedDoctor(doctor));
    navigate("BookingSelectPatient");
  }, [selectedHour, doctor]);

  const loading = useMemo(() => Boolean(isLoading === "pending"), [isLoading]);

  return (
    <Container>
      <AppbarOverride
        title={`${doctor?.qualificationData?.character || ""} Bác sĩ ${doctor?.display_name || ""}`}
        isGoBack
      >
        <Appbar.Action
          animated={false}
          icon={() => <MaterialIcons name="favorite-outline" size={24} color="black" />}
        />
      </AppbarOverride>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperView}>
          <DoctorInfo
            character={doctor?.qualificationData?.character || ""}
            displayName={`Bác sĩ ${doctor?.display_name || ""}`}
            specialtyName={doctor?.specialtyData?.name || ""}
            desc={
              doctor?.desc ||
              `15 năm kinh nghiệm trong lĩnh vực ${doctor?.specialtyData?.name}, bác sĩ khoa ${doctor?.specialtyData?.name}, bác sĩ nhận khám bệnh nhân từ 18 tuổi trở lên`
            }
            photo={doctor?.photo}
          />

          <View style={styles.wrapperAchievement}>
            {achievements.map((a, index) => (
              <AchievementItem key={index} {...a} />
            ))}
          </View>

          <View style={styles.wrapperCalendar}>
            <Alert text={doctor?.operation?.department?.desc || ""} />

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

          <View style={styles.wrapperAddress}>
            <Text variant="labelLarge" style={styles.addressTitleText}>
              Địa chỉ khám
            </Text>

            <View style={styles.line} />

            <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
              PHÒNG KHÁM HEALTHY CARE
            </Text>
            <Text variant="bodyMedium">Địa chỉ: ĐẠI HỌC CẦN THƠ</Text>
            <Text variant="bodyMedium">Email: HealthyCare@gmail.com</Text>
            <Text variant="bodyMedium">SĐT: 0106790291</Text>
            <Text variant="bodyMedium" style={styles.addressTitleTextV2}>
              Giá khám:
              <Text style={[styles.addressTitleTextV2, styles.colorRed]}>
                {fNumber(doctor?.specialtyData?.price || 100000)} VNĐ
              </Text>
            </Text>
          </View>

          <View style={styles.wrapperAddress}>
            <Text variant="labelLarge" style={styles.addressTitleText}>
              Giới thiệu
            </Text>

            <View style={styles.line} />

            <View>
              <Text variant="bodyLarge" style={{ fontWeight: "600" }}>
                Bác sĩ {doctor?.display_name || ""}
              </Text>
              <Text variant="bodyMedium" style={styles.descText}>
                - 15 năm kinh nghiệm trong lĩnh vực {doctor?.specialtyData?.name}
              </Text>
              <Text variant="bodyMedium" style={styles.descText}>
                - Bác sĩ khoa {doctor?.specialtyData?.name}
              </Text>
              <Text variant="bodyMedium" style={styles.descText}>
                - Giảng viên kiêm nhiệm Bộ môn
                {doctor?.specialtyData?.name}
              </Text>
              <Text variant="bodyMedium" style={styles.descText}>
                - Bác sĩ nhận bệnh nhân từ 18 tuổi trở lên
              </Text>
              <Text variant="bodyLarge" style={{ fontWeight: "600" }}>
                Quá trình công tác
              </Text>
              <Text variant="bodyMedium" style={styles.descText}>
                - Bác sĩ khoa {doctor?.specialtyData?.name}, Phòng khám HealthyCare, Trường Đại học
                Cần Thơ
              </Text>

              {/* <Pressable style={styles.wrapperText} onPress={onToggleShortText}>
                  <Text style={styles.press} variant="labelLarge">
                    {fullText ? "Ẩn bớt" : "Xem thêm"}
                  </Text>
                </Pressable> */}
            </View>
          </View>

          {/* <View style={styles.wrapperAddress}>
            <View style={styles.wrapperHeaderReview}>
              <Text variant="labelLarge" style={styles.addressTitleText}>
                Đánh giá
              </Text>
              <Pressable>
                <Text variant="labelLarge" style={styles.sesAllBtnText}>
                  Xem tất cả
                </Text>
              </Pressable>
            </View>

            <View style={styles.line} />

            <View>
              {reviews.slice(0, 5).map((r) => (
                <ReviewItem key={r.id} {...r} />
              ))}
            </View>
          </View> */}
        </View>
      </ScrollView>

      <SurfaceButton onPress={navigationSelectPatient} label="Đặt khám" />
    </Container>
  );
};

export default DoctorDetailsScreen;
