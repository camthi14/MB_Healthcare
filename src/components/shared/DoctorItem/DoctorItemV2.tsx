import { BLUR_HASH } from "@/constants/common";
import { IDoctorResponse } from "@/models/doctor.model";
import { navigate } from "@/services/navigation";
import { Image } from "expo-image";
import { PureComponent } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./DoctorItemStyles";

export type DoctorItemItemProps = {
  row: IDoctorResponse;
};

export default class DoctorItemV2 extends PureComponent<DoctorItemItemProps> {
  _onPressDetails() {
    if (!this.props.row.id) return;
  }

  render() {
    const styles = useStyles();
    const { photo, display_name, qualificationData, id } = this.props.row;

    return (
      <View style={styles.surface}>
        <Pressable onPress={this._onPressDetails} style={styles.wrapper}>
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
  }
}
