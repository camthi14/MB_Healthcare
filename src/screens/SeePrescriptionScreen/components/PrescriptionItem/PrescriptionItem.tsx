import { ColorSchemas } from "@/constants/colors";
import { MedicineOptionsInPrescription } from "@/models/prescriptions.model";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import { fNumber } from "@/utils/formatNumber";
import { scale, verticalScale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type PrescriptionItemProps = {
  data: MedicineOptionsInPrescription;
  index: number;
};

const PrescriptionItem: FC<PrescriptionItemProps> = ({ data, index }) => {
  const styles = useStyles();

  return (
    <View style={styles.wrapperCardItem}>
      <View style={styles.content}>
        <BookingItemLabel label="STT" value={`${index}`} />

        <BookingItemLabel color={ColorSchemas.blueV2} label="Tên thuốc" value={`${data?.name}`} />

        <BookingItemLabel
          color={ColorSchemas.black}
          label="Giá niêm yết"
          value={`${fNumber(data.infoData?.price_sell || 0)}`}
        />

        <BookingItemLabel color={ColorSchemas.black} label="Nhóm thuốc" value={`${data?.name}`} />

        <BookingItemLabel
          color={ColorSchemas.black}
          label="Đơn vị"
          value={`${data?.unit?.name} (${data?.unit?.character})`}
        />

        <BookingItemLabel
          color={ColorSchemas.blueV2}
          label="Số lượng"
          value={`${data.quantity_ordered}`}
        />

        <View style={styles.line} />

        <Text style={styles.title}>Hướng dẫn sử dụng</Text>

        <BookingItemLabel
          color={ColorSchemas.red}
          label="Ngày uống"
          value={`${data?.amount_use_in_day} lần`}
        />

        <BookingItemLabel
          color={ColorSchemas.red}
          label="Số lượng thuốc sử dụng cho 1 lần"
          value={`${data?.amount_of_medication_per_session}`}
        />

        <BookingItemLabel
          color={ColorSchemas.red}
          label="Buổi sử dụng thuốc"
          value={`${data?.session}`}
        />
      </View>
    </View>
  );
};

export default PrescriptionItem;

const useStyles = () => {
  return StyleSheet.create({
    line: {
      width: "100%",
      height: 1,
      backgroundColor: ColorSchemas.grey,
      marginVertical: verticalScale(15),
    },
    wrapperCardItem: {
      flex: 1,
      gap: scale(10),
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: ColorSchemas.blueLighterV3,
    },
    image: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(13),
    },
    title: {
      ...textStyles.H5,
      fontWeight: "bold",
    },
    content: {},
  });
};
