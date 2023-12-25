import React, { FC } from "react";
import { Text, View } from "react-native";
import useStyles from "./PolicyCancelStyles";

const PolicyCancel: FC = () => {
  const styles = useStyles();
  const policyCancel = [
    {
      label: "Hủy phòng trong vòng 1-7 ngày trước ngày nhận phòng",
      value: "100",
      labelPrice: "100%",
    },
    {
      label: "Hủy phòng từ 7-15 ngày trước ngày nhận phòng",
      value: "50-75",
      labelPrice: "từ 50% đến 75%.",
    },
    {
      label: "Hủy phòng từ 15-30 ngày trước ngày nhận phòng",
      value: "25-50",
      labelPrice: "từ 25% đến 50%.",
    },
    {
      label: "Hủy phòng từ 30-60 ngày trước ngày nhận phòng",
      value: "10-25",
      labelPrice: "từ 10% đến 25%.",
    },
    { label: "Hủy phòng trước 60 ngày hoặc hơn", value: "00", labelPrice: "0%" },
  ];

  return (
    <View>
      <Text style={styles.policyLabel}>Chính sách hủy phòng</Text>
      <View style={styles.wrapperPolicy}>
        {policyCancel.map((policy, index) => (
          <View key={index}>
            <Text
              style={styles.policyText}
            >{`${policy.label}. Bạn phải trả ${policy.labelPrice} phí.`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PolicyCancel;
