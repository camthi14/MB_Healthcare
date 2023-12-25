import Alert from "@/components/ui/Alert";
import { ColorSchemas } from "@/constants/colors";
import { BookingType } from "@/models/booking.model";
import { ExaminationCardType, convertStatusExam } from "@/models/examinationCard.model";
import BookingItem from "@/screens/BookingScreen/component/BookingItem";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import LabelItemIcon from "@/screens/ProfileScreen/components/LabelItemIcon";
import { navigate } from "@/services/navigation";
import { scale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import { AntDesign, FontAwesome5, Fontisto, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type ExaminationCardProps = {
  data: ExaminationCardType | null;
  booking: BookingType | null;
  billExists: boolean;
  detailsExists: boolean;
  prescriptionExists: boolean;
};

const ExaminationCard: FC<ExaminationCardProps> = ({
  data,
  booking,
  billExists,
  detailsExists,
  prescriptionExists,
}) => {
  const styles = useStyles(Boolean(data));

  const status = useMemo(() => (!data ? null : convertStatusExam(data.status!)), [data]);

  const navigationSeePrescription = useCallback(() => {
    if (!data || !data?.id) return;
    navigate("SeePrescription", { examCardId: data.id });
  }, [data]);

  const navigationSeeBill = useCallback(() => {
    if (!data || !data?.id) return;
    navigate("SeeBill", { examCardId: data.id });
  }, [data]);

  const navigationSeeSubclinical = useCallback(() => {
    if (!data || !data?.id) return;
    navigate("SeeSubclinical", { examCardId: data.id });
  }, [data]);

  return (
    <View>
      <View>
        <Text style={styles.title}>Thông tin đặt khám</Text>

        {booking ? <BookingItem isSeeDetails row={booking} /> : null}
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Thông tin phiếu khám</Text>

        {!data ? (
          <Alert
            text={"Chưa có thông tin khám bệnh"}
            icon={<AntDesign name="infocirlceo" size={14} color={ColorSchemas.blueV2} />}
            borderColor={ColorSchemas.blueV2}
            color={ColorSchemas.blueV2}
            background={ColorSchemas.blueLighterV3}
          />
        ) : (
          <>
            <BookingItemLabel
              color={ColorSchemas.blueV2}
              label="Mạch"
              value={`${data.artery} lần / phút`}
            />
            <BookingItemLabel
              color={ColorSchemas.blueV2}
              label="Nhiệt độ"
              value={`${data.temperature} độ C`}
            />
            <BookingItemLabel
              color={ColorSchemas.blueV2}
              label="Độ bảo hòa oxy"
              value={`${data.spO2} spO2`}
            />
            <BookingItemLabel
              color={ColorSchemas.blueV2}
              label="Nhiệt thở"
              value={`${data.breathing_rate} nhịp / phút`}
            />
            <BookingItemLabel
              label="Huyết áp"
              color={ColorSchemas.red}
              value={`${data.blood_pressure}/${data.under_blood_pressure} mmHg`}
            />

            <BookingItemLabel label="Trạng thái" color={status?.color} value={`${status?.text}`} />
          </>
        )}
      </View>

      <View style={styles.bottom}>
        {billExists ? (
          <LabelItemIcon onPress={navigationSeeBill} label="Xem hóa đơn">
            <FontAwesome5 name="receipt" size={24} color={ColorSchemas.yellowDark} />
          </LabelItemIcon>
        ) : null}

        {prescriptionExists ? (
          <LabelItemIcon onPress={navigationSeePrescription} label="Xem toa thuốc">
            <Fontisto name="prescription" size={24} color="black" />
          </LabelItemIcon>
        ) : null}

        {detailsExists ? (
          <LabelItemIcon onPress={navigationSeeSubclinical} label="Xem chỉ định">
            <MaterialIcons name="assignment" size={24} color={ColorSchemas.red} />
          </LabelItemIcon>
        ) : null}
      </View>
    </View>
  );
};

export default ExaminationCard;

const useStyles = (isFound: boolean) => {
  return StyleSheet.create({
    bottom: {
      marginTop: 30,
      gap: 30,
    },
    container: {
      flex: 1,
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: isFound ? ColorSchemas.blueLighterV3 : ColorSchemas.white,
    },
    title: {
      ...textStyles.H5,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
};
