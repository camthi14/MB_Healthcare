import { ColorSchemas } from "@/constants/colors";
import {
  BillType,
  convertOptionsBill,
  convertPaymentStatus,
  convertPaymentStatusColors,
} from "@/models/bill.model";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import { fNumber } from "@/utils/formatNumber";
import { scale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type BillItemProps = {
  data: BillType;
};

const BillItem: FC<BillItemProps> = ({ data }) => {
  const styles = useStyles();

  return (
    <View style={styles.wrapperCardItem}>
      <Text style={styles.title}>{convertOptionsBill(data.payment_for)}</Text>

      <View style={styles.content}>
        <BookingItemLabel
          color={ColorSchemas.red}
          label="Tổng tiền"
          value={`${fNumber(data.total_price)} VNĐ`}
        />

        {/* <BookingItemLabel label="Tiền trả trước" value={`${fNumber(data?.deposit || 0)} VNĐ`} /> */}

        <BookingItemLabel
          label="Đã nhận"
          value={`${fNumber(data.total_price) || fNumber(data?.price_received || 0)} VNĐ`}
        />

        {/* <BookingItemLabel label="Tiền thừa" value={`${fNumber(data?.change || 0)} VNĐ`} /> */}

        <BookingItemLabel
          label="Thu ngân"
          value={data?.dataEmployee?.display_name || "Chưa có thông tin"}
        />

        <BookingItemLabel
          label="Trạng thái"
          color={convertPaymentStatusColors(data.status)}
          value={convertPaymentStatus(data.status)}
        />
      </View>
    </View>
  );
};

export default BillItem;

const useStyles = () => {
  return StyleSheet.create({
    wrapperCardItem: {
      flex: 1,
      gap: scale(10),
      borderRadius: scale(12),
      padding: scale(10),
      backgroundColor: ColorSchemas.white,
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
