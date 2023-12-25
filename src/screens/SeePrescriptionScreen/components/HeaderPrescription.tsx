import { ColorSchemas } from "@/constants/colors";
import { formatDate } from "@/helpers/date.helper";
import { ResponseGetExamCardAndDetails } from "@/models/prescriptions.model";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";
import { scale } from "@/utils/scale";
import textStyles from "@/utils/textStyles";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

type HeaderPrescriptionProps = {
  data: ResponseGetExamCardAndDetails | null;
};

const HeaderPrescription: FC<HeaderPrescriptionProps> = ({ data }) => {
  return (
    <View style={styles.wrapperCardItem}>
      <BookingItemLabel label="Chuẩn đoán" value={`${data?.diagnosis}`} />

      <BookingItemLabel label="Dặn dò" value={`${data?.note}`} />

      <BookingItemLabel
        label="Tái khám sau"
        color={ColorSchemas.blue}
        value={`${data?.quantity_re_exam} ngày (${formatDate(
          data?.date_re_exam || "",
          "DD/MM/YYYY"
        )})`}
      />
    </View>
  );
};

export default HeaderPrescription;

const styles = StyleSheet.create({
  wrapperCardItem: {
    flex: 1,
    borderRadius: scale(12),
    padding: scale(10),
    backgroundColor: ColorSchemas.white,
    marginBottom: 10,
  },
  title: {
    ...textStyles.H5,
    fontWeight: "bold",
  },
});
