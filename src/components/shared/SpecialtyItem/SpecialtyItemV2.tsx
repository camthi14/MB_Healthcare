import { BLUR_HASH } from "@/constants/common";
import { ISpecialist } from "@/models/specialty.model";
import { navigate } from "@/services/navigation";
import { Image } from "expo-image";
import React, { PureComponent } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import useStyles from "./SpecialtyItemStyles";

export type SpecialtyItemProps = {
  row: ISpecialist;
};

export default class SpecialtyItemV2 extends PureComponent<SpecialtyItemProps> {
  _onPressDetails() {
    if (!this?.props.row.id) return;
    navigate("SpecialtyDetails", { id: this.props?.row.id });
  }

  render() {
    const styles = useStyles();
    const { photo, name, id } = this.props?.row;

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
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
}
