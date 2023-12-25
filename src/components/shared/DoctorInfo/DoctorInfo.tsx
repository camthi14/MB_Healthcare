import { Pressable, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { BLUR_HASH } from "@/constants/common";
import useStyles from "./DoctorInfoStyles";

type DoctorInfoProps = {
  photo?: string;
  displayName: string;
  character: string;
  specialtyName: string;
  desc: string;
  goDoctor?: () => void;
};

const DoctorInfo: FC<DoctorInfoProps> = ({
  photo,
  character,
  desc,
  displayName,
  specialtyName,
  goDoctor,
}) => {
  const styles = useStyles();

  return (
    <Pressable onPress={goDoctor} style={styles.wrapperHeader}>
      <View>
        <Image
          source={photo}
          placeholder={BLUR_HASH}
          style={styles.photo}
          contentFit="cover"
          transition={500}
        />
      </View>

      <View style={styles.wrapperDisplayName}>
        <Text variant="bodyLarge" style={styles.displayName}>
          {`${character} ${displayName}`}
        </Text>

        <Text variant="labelLarge" style={[styles.italic, styles.my2]}>
          {`Chuyên khoa: ${specialtyName}`}
        </Text>
        <Text variant="labelSmall" style={styles.italic}>
          {desc}
        </Text>
      </View>
    </Pressable>
  );
};

export default DoctorInfo;

const styles = StyleSheet.create({});
