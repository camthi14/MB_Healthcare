import Container from "@/components/shared/Container";
import DoctorInfo from "@/components/shared/DoctorInfo";
import KeyboardFormOverride from "@/components/shared/KeyboardFormOverride";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { appActions } from "@/features/app";
import { useBooking } from "@/features/booking";
import { bookingActions } from "@/features/booking/bookingSlice";
import { formatDate } from "@/helpers/date.helper";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { BookingForPayload } from "@/types/booking";
import { fNumber } from "@/utils/formatNumber";
import { scale } from "@/utils/scale";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { Text } from "react-native-paper";
import FormBookingSelect, { FormBookingSelectRefProps } from "./form/FormBookingSelect";
import PatientInfo from "../BookingSelectDoctorScreen/component/PatientInfo/PatientInfo";

const BookingSelect: FC = () => {
  const ref = useRef<FormBookingSelectRefProps>(null);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [idxImg, setIdxImg] = useState(0);

  const {
    selectedDoctor: doctor,
    dateSelectedBooking,
    hour,
    order,
    selectedPatient,
  } = useBooking();

  const initialValues = useMemo(
    (): BookingForPayload => ({
      reason: "",
    }),
    []
  );

  const onPressBtnBottom = () => {
    if (!ref.current || !ref.current.handleSubmit) return;
    ref.current.handleSubmit();
  };

  const handleSubmit = useCallback(
    (values: BookingForPayload) => {
      if (!doctor || !hour || !order || !dateSelectedBooking || !selectedPatient) return;

      dispatch(appActions.setLoading(true));
      dispatch(
        bookingActions.bookingStart({
          date: dateSelectedBooking,
          doctorId: doctor.id!,
          hourId: hour.id!,
          order: order,
          patientId: selectedPatient.id!,
          price: doctor.specialtyData?.price || 100000,
          reason: values.reason,
          images: image,
        })
      );
    },
    [dateSelectedBooking, hour, doctor, order, image, selectedPatient]
  );

  const pickImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      aspect: [1, 1],
      allowsMultipleSelection: true,
    };

    dispatch(appActions.setLoading(true));

    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      dispatch(appActions.setLoading(false));
      return;
    }

    const results = await ImagePicker.launchImageLibraryAsync(options);

    if (results.canceled) return;

    setImage((prev) => [...prev, ...results.assets.map((t) => t?.uri!)!]);

    dispatch(appActions.setLoading(false));
  };

  const handleClickImage = useCallback((index: number) => {
    setIdxImg(index);
    setIsVisible(true);
  }, []);

  const handleRemoveImage = useCallback((src: string) => {
    setImage((prev) => [...prev.filter((t) => t !== src)]);
  }, []);

  const removeAllImage = useCallback(() => {
    setImage([]);
  }, []);

  const handleGoDoctor = useCallback(() => {
    if (!doctor) return;
    dispatch(bookingActions.resetBooking());
    navigate("DoctorDetails", { id: doctor.id! });
  }, [doctor]);

  return (
    <Container>
      <AppbarOverride title="Lý do khám" isGoBack isHome resetBooking />

      {image.length ? (
        <ImageView
          images={image.map((r) => ({ uri: r }))}
          imageIndex={idxImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}

      <KeyboardFormOverride
        formComponent={
          <View style={{ paddingBottom: 40 }}>
            <View style={{ marginBottom: 20 }}>
              <DoctorInfo
                goDoctor={handleGoDoctor}
                character={doctor?.qualificationData?.character || ""}
                displayName={doctor?.display_name || ""}
                specialtyName={doctor?.specialtyData?.name || doctor?.specialty?.name || ""}
                desc={
                  doctor?.desc ||
                  `15 năm kinh nghiệm trong lĩnh vực ${
                    doctor?.specialtyData?.name || doctor?.specialty?.name || ""
                  }, bác sĩ khoa ${
                    doctor?.specialtyData?.name || doctor?.specialty?.name || ""
                  }, bác sĩ nhận khám bệnh nhân từ 18 tuổi trở lên`
                }
                photo={doctor?.photo}
              />

              {selectedPatient ? <PatientInfo patient={selectedPatient} /> : null}

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
                <Text>Ngày:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{`${formatDate(
                  dateSelectedBooking,
                  "DD/MM/YYYY"
                )}`}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
                <Text>Giờ đã chọn:</Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >{`${hour?.time_start} - ${hour?.time_end}`}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
                <Text>Phí khám:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{`${fNumber(100000)} VNĐ`}</Text>
              </View>
            </View>

            <FormBookingSelect ref={ref} initialValues={initialValues} onSubmit={handleSubmit} />

            <View>
              <Text style={{ marginBottom: 10 }}>Thêm ảnh (Không bắt buộc)</Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
                <Pressable
                  onPress={pickImage}
                  style={{
                    width: scale(105),
                    height: scale(100),
                    borderRadius: 4,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.2)",
                  }}
                >
                  <Entypo name="upload" size={24} color="black" />
                </Pressable>

                {image.length
                  ? image.map((r, i) => (
                      <Pressable
                        key={r}
                        onPress={() => handleClickImage(i)}
                        style={{
                          borderWidth: 1,
                          width: scale(105),
                          height: scale(100),
                          borderColor: ColorSchemas.grey,
                          borderRadius: 4,
                        }}
                      >
                        <Image
                          source={{ uri: r }}
                          style={{
                            borderRadius: 4,
                            width: "100%",
                            height: "100%",
                          }}
                          contentFit="cover"
                          placeholder={BLUR_HASH}
                          transition={3000}
                        />

                        <Pressable
                          onPress={() => handleRemoveImage(r)}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: 4,
                            backgroundColor: ColorSchemas.red,
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                          }}
                        >
                          <AntDesign name="closecircle" size={24} color="white" />
                        </Pressable>
                      </Pressable>
                    ))
                  : null}

                {image.length >= 4 ? (
                  <Pressable
                    onPress={removeAllImage}
                    style={{
                      width: scale(105),
                      height: scale(100),
                      borderRadius: 4,
                      marginBottom: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <AntDesign name="closecircleo" size={24} color={ColorSchemas.red} />
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        }
        labelBtn="Hoàn thành"
        onPressBtn={onPressBtnBottom}
      />
    </Container>
  );
};

export default BookingSelect;
