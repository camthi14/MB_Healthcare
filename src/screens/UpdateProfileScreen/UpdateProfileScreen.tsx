import Container from "@/components/shared/Container";
import HelperText from "@/components/ui/form/Input/HelperText";
import { BLUR_HASH } from "@/constants/common";
import { useTheme } from "@/contexts/ThemeContext";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { UpdateProfilePayload } from "@/types/patient";
import { RootStackParamList } from "@/types/navigation";
import { scale } from "@/utils/scale";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import useStyles from "../LoginScreen/styles";
import UpdateProfileForm from "./form/UpdateProfileForm";

const UpdateProfileScreen: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const {
    params: { userId },
  } = useRoute<RouteProp<RootStackParamList, "UpdateProfile">>();

  const { themeType } = useTheme();

  const handleOnPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async (values: UpdateProfilePayload, resetForm: () => void) => {
    if (!userId) return;

    dispatch(appActions.setLoading(true));
    setError("");

    try {
      await authApi.updateProfile(userId, values);
      ToastAndroid.showWithGravity(
        "Cập nhật thông tin thành công",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      dispatch(authActions.setStatus(null));
    } catch (error: any) {
      const { response } = error;

      let msg = error.message;

      if (response && response.data && response.data.message) {
        const { message } = response.data;
        msg = message;
      }

      setError(msg);

      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: msg,
      });
    } finally {
      dispatch(appActions.setLoading(false));
    }
  };

  return (
    <Container style={styles.bgWhite}>
      <Appbar.Header style={styles.bgWhite}>
        <Appbar.Content title="" />
        {themeType === "light" && (
          <Appbar.Action
            size={46}
            icon={() => (
              <Image
                source={require("@/assets/icon/Star.png")}
                style={styles.image}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={1000}
              />
            )}
          />
        )}
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.flex, styles.container]}>
            <View style={[styles.wrapTitle]}>
              <Text style={styles.title}>Thông tin cá nhân</Text>
            </View>

            {error && (
              <View style={{ marginTop: scale(15) }}>
                <HelperText fontSize="H5" type="error" text={error} visible />
              </View>
            )}

            <View style={{ marginTop: scale(38) }}>
              <UpdateProfileForm
                initialValues={{
                  email: "",
                  first_name: "",
                  gender: undefined,
                  last_name: "",
                }}
                onSubmit={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default UpdateProfileScreen;
