import Container from "@/components/shared/Container";
import HelperText from "@/components/ui/form/Input/HelperText";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import AsyncStorageCommon from "@/helpers/asyncStorage";
import { getMessageErrorAxios } from "@/helpers/error.helper";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { LoginPayload } from "@/types/patient";
import { scale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import LoginForm from "./form/LoginForm";
import useStyles from "./styles";
import { Image } from "expo-image";

const LoginScreen: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    (async () => {
      const { userId } = await AsyncStorageCommon.getMultiple<{
        userId: string | null;
      }>(["userId"]);

      if (!userId) return;
    })();
  }, []);

  const handleSubmit = async (values: LoginPayload, resetForm: () => void) => {
    dispatch(appActions.setLoading(true));
    setError("");

    try {
      const {
        metadata: { tokens, user },
      } = await authApi.loginWithPhoneNumber(values);
      ToastAndroid.showWithGravity("Đăng nhập thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
      dispatch(authActions.setAccessToken(tokens.accessToken));
      dispatch(authActions.setAuth({ userId: user.id }));
      dispatch(authActions.setRefreshToken(tokens.refreshToken));
    } catch (error: any) {
      let msg = getMessageErrorAxios(error);

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
            <View
              style={[
                styles.wrapTitle,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                },
              ]}
            >
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: "white",
                }}
              >
                <Image
                  contentFit="cover"
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                  source={require("@/assets/logo/logo.jpg")}
                />
              </View>
              <Text variant="titleLarge" style={{ fontWeight: "700", marginTop: 5 }}>
                ĐĂNG NHẬP
              </Text>
              <Text
                variant="bodyMedium"
                style={{ letterSpacing: 2, marginTop: 2, fontStyle: "italic" }}
              >
                Chào mừng bạn đã quay trở lại!
              </Text>
            </View>

            {error && (
              <View style={{ marginTop: scale(15) }}>
                <HelperText fontSize="H5" type="error" text={error} visible />
              </View>
            )}

            <View style={{ marginTop: scale(38) }}>
              <LoginForm
                initialValues={{ password: "", phone_number: "" }}
                onSubmit={handleSubmit}
              />
            </View>

            <View style={styles.textBottom}>
              <Text style={{ textAlign: "center" }}>Bạn chưa có tài khoản? </Text>
              <Pressable onPress={handleOnPress}>
                <Text style={{ fontWeight: "bold", color: ColorSchemas.blue }}>Đăng ký</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;
