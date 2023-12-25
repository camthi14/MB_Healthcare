import Container from "@/components/shared/Container";
import HelperText from "@/components/ui/form/Input/HelperText";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { RegisterPayload } from "@/types/patient";
import { scale } from "@/utils/scale";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
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
import useStyles from "../LoginScreen/styles";
import RegisterForm from "./form/RegisterForm";
import { navigate } from "@/services/navigation";
import { Image } from "expo-image";

const RegisterScreen: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const handleOnPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async (values: RegisterPayload, resetForm: () => void) => {
    dispatch(appActions.setLoading(true));
    setError("");

    try {
      const response = await authApi.register(values);
      resetForm();
      ToastAndroid.showWithGravity("Đăng ký thành công.", ToastAndroid.LONG, ToastAndroid.CENTER);
      navigate("Login");
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
                ĐĂNG KÝ TÀI KHOẢN
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
              <RegisterForm
                initialValues={{
                  password: "",
                  phone_number: "",
                  first_name: "",
                  last_name: "",
                  birth_date: "",
                }}
                onSubmit={handleSubmit}
              />
            </View>

            <View style={styles.textBottom}>
              <Text style={{ textAlign: "center" }}>Bạn đã có tài khoản? </Text>
              <Pressable onPress={handleOnPress}>
                <Text style={{ fontWeight: "bold", color: ColorSchemas.blue }}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterScreen;
