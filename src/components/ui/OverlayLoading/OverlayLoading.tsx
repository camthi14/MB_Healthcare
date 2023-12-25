import React from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors, Surface } from "react-native-paper";
import useStyles from "./style";
import { useLoading } from "@/features/app";

interface OverlayLoadingProps {
  visible?: boolean;
}

const OverlayLoading: React.FC<OverlayLoadingProps> = ({ visible }) => {
  const styles = useStyles();
  const loading = useLoading();

  visible = visible ?? loading;

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Surface style={styles.bgLoading} elevation={4}>
        <ActivityIndicator animating={true} color={MD2Colors.blue400} size={40} />
      </Surface>
    </View>
  );
};

export default OverlayLoading;
