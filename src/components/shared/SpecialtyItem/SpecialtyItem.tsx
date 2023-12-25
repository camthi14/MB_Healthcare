import { BLUR_HASH } from "@/constants/common";
import { ISpecialist } from "@/models/specialty.model";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, memo, useCallback } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./SpecialtyItemStyles";

export type SpecialtyItemProps = {
  row: ISpecialist;
};

const SpecialtyItem: FC<SpecialtyItemProps> = ({ row: { photo, name, id } }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const onPressDetails = useCallback(() => {
    if (!id) return;
    navigation.navigate("SpecialtyDetails", { id });
  }, [id]);

  return (
    <View style={styles.surface}>
      <Pressable onPress={onPressDetails} style={styles.wrapper}>
        <Image
          source={photo}
          style={styles.image}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={1000}
        />

        <View style={styles.wrapperContent}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(SpecialtyItem);
