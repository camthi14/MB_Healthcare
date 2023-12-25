import { ColorSchemas } from "@/constants/colors";
import { formatDate } from "@/helpers/date.helper";
import { IPatient } from "@/models/patient.model";
import { scale, verticalScale } from "@/utils/scale";
import { Entypo, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

type ProfileItemPatientProps = {
  onPressSelected?: (item: IPatient) => void;
  selected?: boolean;
} & IPatient;

const ProfileItemPatient: FC<ProfileItemPatientProps> = (props) => {
  const { selected, onPressSelected, ...dataProfile } = props;
  const { infoData, display_name, phone_number, id, relationship } = dataProfile;

  const styles = useStyles();

  const onPress = useCallback(() => {
    if (!onPressSelected) return;
    onPressSelected(dataProfile);
  }, [onPressSelected, dataProfile]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <View style={[styles.head, styles.mb, styles.wrapperHead]}>
        <View style={styles.head}>
          <FontAwesome name="user-circle" size={20} color="grey" />
          <Text variant="labelLarge" style={styles.displayName}>
            {display_name}
          </Text>
        </View>

        <RadioButton
          value={id!}
          onPress={onPress}
          color={ColorSchemas.blue}
          status={selected ? "checked" : "unchecked"}
        />
      </View>

      <View style={[styles.head, styles.mb]}>
        <Feather name="smartphone" size={20} color="grey" />
        <Text variant="labelLarge" style={styles.text}>
          {phone_number}
        </Text>
      </View>

      {infoData ? (
        <>
          <View style={[styles.head, styles.mb]}>
            <MaterialIcons name="date-range" size={20} color="grey" />
            <Text variant="labelLarge" style={styles.text}>
              {formatDate(infoData?.birth_date!, "DD/MM/YYYY")}
            </Text>
          </View>

          {infoData?.address ? (
            <View style={styles.head}>
              <Entypo name="location-pin" size={20} color="grey" />
              <Text variant="labelLarge" style={styles.text}>
                {infoData?.address}
              </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </TouchableOpacity>
  );
};

export default ProfileItemPatient;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: ColorSchemas.white,
      borderRadius: scale(10),
      paddingVertical: verticalScale(8),
      paddingHorizontal: scale(8),
      marginTop: verticalScale(8),
      elevation: 3,
    },
    head: {
      flexDirection: "row",
      gap: scale(10),
    },
    wrapperHead: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    mb: {
      marginBottom: verticalScale(10),
    },
    displayName: {
      color: ColorSchemas.blue,
      flexWrap: "wrap",
    },
    btn: {
      paddingVertical: verticalScale(4),
      paddingHorizontal: scale(14),
      backgroundColor: ColorSchemas.blue,
      borderRadius: scale(20),
    },
    text: {
      flex: 1,
      fontSize: scale(10),
      flexWrap: "wrap",
    },
    btnText: {
      color: ColorSchemas.white,
      fontSize: scale(10),
    },
  });
};
