import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import HelperText from "@/components/ui/form/Input/HelperText";
import { appActions, useLoading } from "@/features/app";
import { getMessageErrorAxios } from "@/helpers/error.helper";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { ChangePasswordPayload } from "@/types/patient";
import { SPACING, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useState } from "react";
import { ToastAndroid, View } from "react-native";
import ChangePasswordForm from "./components/ChangePasswordForm";

const SecurityScreen: FC = () => {
  const {
    params: { patientId },
  } = useRoute<RouteProp<RootStackParamList, "EditProfile">>();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const loading = useLoading();

  const handleSubmit = useCallback(
    async ({ confirmPassword, ...others }: ChangePasswordPayload, resetForm: () => void) => {
      dispatch(appActions.setLoading(true));
      setError("");

      try {
        await authApi.changePassword(others, patientId);

        ToastAndroid.showWithGravity(
          "Thay đổi mật khẩu thành công",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );

        resetForm();
      } catch (error) {
        let message = getMessageErrorAxios(error);
        setError(message);
        dispatch(appActions.setSnackbar({ open: true, text: message, type: "error" }));
      } finally {
        dispatch(appActions.setLoading(false));
      }
    },
    [patientId]
  );

  return (
    <Container>
      <AppbarOverride title="Đổi mật khẩu" isGoBack />

      <View style={{ flex: 1 }}>
        {error && (
          <View style={{ marginTop: scale(15), paddingHorizontal: SPACING }}>
            <HelperText fontSize="H5" type="error" text={error} visible />
          </View>
        )}

        <ChangePasswordForm
          loading={loading}
          initialValues={{ confirmPassword: "", newPassword: "", password: "" }}
          onSubmit={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default SecurityScreen;
