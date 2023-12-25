import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, memo, useCallback } from "react";
import { ColorSchemas } from "@/constants/colors";
import { Text } from "react-native-paper";
import { scale, verticalScale } from "@/utils/scale";
import { IPatient, convertRelationship } from "@/models/patient.model";

export type PatientItemProps = {
  active?: boolean;
  onPressSelectedId?: (id: string) => void;
} & IPatient;

const PatientItem: FC<PatientItemProps> = ({ relationship, active, id, onPressSelectedId }) => {
  const styles = useStyles(active);

  const onPress = useCallback(() => {
    if (!onPressSelectedId || !id) return;
    onPressSelectedId(id);
  }, [onPressSelectedId, id]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.container}>
      <Text variant="labelLarge" style={{ textAlign: "center" }}>
        {convertRelationship(relationship)}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(PatientItem);

const ITEM_SPACING = 50;

const useStyles = (active?: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: ColorSchemas.greyLighter,
      width: scale(ITEM_SPACING),
      height: verticalScale(ITEM_SPACING),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(4),
      borderWidth: 2,
      borderColor: active ? ColorSchemas.blue : ColorSchemas.greyLighter,
    },
  });
};
