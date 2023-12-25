import { scale, verticalScale } from "@/utils/scale";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import useStyles from "./styles";

type Props = {
  onSubmit?: () => void;
  label: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
};

const ButtonOverride: React.FC<Props> = ({ onSubmit, label, color, loading, disabled }) => {
  const styles = useStyles({ color, disabled });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      buttonColor={styles.bg.backgroundColor}
      contentStyle={styles.contentStyle}
      style={{ borderRadius: scale(10) }}
      labelStyle={styles.labelStyle}
      loading={loading}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default ButtonOverride;
