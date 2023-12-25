import { BLUR_HASH } from "@/constants/common";
import { IDoctorResponse } from "@/models/doctor.model";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { FC, memo, useCallback } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./DoctorItemStyles";

export type DoctorItemItemProps = {
  row: IDoctorResponse;
};

const DoctorItem: FC<DoctorItemItemProps> = (props) => {
  const { photo, display_name, qualificationData, id } = props.row;
  const styles = useStyles();
  const navigation = useNavigation();

  const onPressDetails = useCallback(() => {
    if (!id) return;
    navigation.navigate("DoctorDetails", { id });
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
          <Text style={styles.title} numberOfLines={2}>
            {`${qualificationData?.character} ${display_name}`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(DoctorItem);
