import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useStyles from "./BookingDoctorItemStyles";
import { Image } from "expo-image";
import { BLUR_HASH } from "@/constants/common";
import { RadioButton } from "react-native-paper";
import { ColorSchemas } from "@/constants/colors";
import { IDoctorResponse } from "@/models/doctor.model";

type BookingDoctorItemProps = {
  row: IDoctorResponse;
  onSelected?: (row: IDoctorResponse) => void;
  checked?: boolean;
};

const BookingDoctorItem: FC<BookingDoctorItemProps> = ({ onSelected, row, checked }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={() => onSelected?.(row)}
      activeOpacity={0.65}
      style={styles.wrapperCardItem}
    >
      <Image
        source={{ uri: row.photo! }}
        style={styles.image}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={500}
      />

      <View style={styles.content}>
        <Text
          style={styles.title}
        >{`${row?.qualificationData?.character} ${row?.display_name}`}</Text>

        <RadioButton
          value={`${row.id}`}
          onPress={() => onSelected?.(row)}
          color={ColorSchemas.blue}
          status={checked ? "checked" : "unchecked"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BookingDoctorItem;
