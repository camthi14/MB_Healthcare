import { ColorSchemas } from "@/constants/colors";
import { appActions, useSnackbar } from "@/features/app";
import { useAppDispatch } from "@/stores/hooks";
import React, { FC, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Portal, Snackbar } from "react-native-paper";

type SnackbarOverrideProps = {};

const SnackbarOverride: FC<SnackbarOverrideProps> = () => {
  const { duration, open, text, type } = useSnackbar();
  const dispatch = useAppDispatch();

  const onDismissSnackBar = () =>
    dispatch(appActions.setSnackbar({ open: false, text: "", type: "default" }));

  const colors = useMemo(
    (): { background: string; theme: string } =>
      ({
        default: { background: ColorSchemas.black, theme: ColorSchemas.white },
        error: { background: ColorSchemas.red, theme: ColorSchemas.white },
        info: { background: ColorSchemas.blue, theme: ColorSchemas.white },
        success: { background: ColorSchemas.green, theme: ColorSchemas.white },
        warning: { background: ColorSchemas.yellowLighter, theme: ColorSchemas.black },
      }[type]),
    [type]
  );

  return (
    <Portal>
      <Snackbar
        visible={open}
        onDismiss={onDismissSnackBar}
        duration={duration}
        onIconPress={onDismissSnackBar}
        theme={{
          colors: { inverseOnSurface: colors.theme },
          fonts: { titleSmall: { fontWeight: "bold" } },
        }}
        style={{ backgroundColor: colors.background }}
      >
        {text}
      </Snackbar>
    </Portal>
  );
};

export default SnackbarOverride;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
