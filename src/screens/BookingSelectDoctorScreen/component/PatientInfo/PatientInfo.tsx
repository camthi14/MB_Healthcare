import { IPatient, convertRelationship } from "@/models/patient.model";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { BLUR_HASH } from "@/constants/common";
import useStyles from "./PatientInfoStyles";
import { fMoment } from "@/utils/formatTime";
import BookingItemLabel from "@/screens/BookingScreen/component/BookingItem/BookingItemLabel";

type PatientInfoProps = {
  patient: IPatient;
};

const PatientInfo: FC<PatientInfoProps> = ({ patient }) => {
  const styles = useStyles();

  return (
    <View style={styles.wrapperCardItem}>
      <Text style={[styles.title, { marginBottom: 5 }]}>Thông tin bệnh nhân</Text>
      <View style={styles.wrapperContent}>
        {patient?.photo ? (
          <Image
            source={{ uri: patient.photo! }}
            style={styles.image}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={500}
          />
        ) : null}

        <View style={styles.content}>
          <BookingItemLabel label="Họ và tên: " value={patient.display_name || ""} />

          {patient.relationship !== "me" ? (
            <BookingItemLabel
              label="Quan hệ gia đình:"
              value={convertRelationship(patient.relationship)}
            />
          ) : null}

          <BookingItemLabel label="Số điện thoại: " value={patient.phone_number || ""} />
          <BookingItemLabel
            label="Ngày sinh: "
            value={fMoment(patient?.infoData?.birth_date, "DD/MM/YYYY") || ""}
          />
        </View>
      </View>
    </View>
  );
};

export default PatientInfo;
