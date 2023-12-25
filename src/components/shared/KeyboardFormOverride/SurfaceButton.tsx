import React, { FC } from "react";
import { Button, Surface } from "react-native-paper";
import { useGlobalStyles } from "../GlobalStyles";
import { ColorSchemas } from "@/constants/colors";

type SurfaceButtonProps = {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

const SurfaceButton: FC<SurfaceButtonProps> = ({ onPress, label, disabled, loading }) => {
  const styles = useGlobalStyles();

  return (
    <Surface
      style={styles.surfaceBottom}
      elevation={5}
      theme={{ colors: { elevation: { level5: ColorSchemas.white } } }}
    >
      <Button
        style={styles.surfaceBtnBottom}
        contentStyle={styles.surfaceBtnContentStyles}
        onPress={onPress}
        mode="contained"
        loading={loading}
        buttonColor={ColorSchemas.blue}
        disabled={disabled}
      >
        {label}
      </Button>
    </Surface>
  );
};

export default SurfaceButton;
