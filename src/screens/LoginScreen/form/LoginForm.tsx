import InputLabel from "@/components/ui/form/InputLabel";
import useStyles from "@/screens/UpdateProfileScreen/form/styles";
import { LoginPayload } from "@/types/patient";
import { scale, verticalScale } from "@/utils/scale";
import loginSchema from "@/validations/schemas/loginSchema";
import { Formik } from "formik";
import React, { FC } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface LoginFormProps {
  onSubmit?: (...args: any) => void;
  initialValues: LoginPayload;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, initialValues }) => {
  const styles = useStyles();

  return (
    <Formik
      enableReinitialize
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <InputLabel
            label="Số điện thoại"
            value={values.phone_number}
            onBlur={handleBlur("phone_number")}
            placeholder="VD: 0542245678"
            keyboardType="phone-pad"
            onChangeText={handleChange("phone_number")}
            error={touched.phone_number && Boolean(errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />

          <InputLabel
            label="Mật khẩu"
            value={values.password}
            placeholder="Nhập mật khẩu của bạn"
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            isSecure
          />

          <View>
            <Text
              style={{
                textAlign: "right",
                color: styles.colorBlack.color,
                fontSize: scale(13),
                fontWeight: "500",
              }}
            >
              Quên mật khẩu?
            </Text>
          </View>

          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              mode="contained"
              onPress={handleSubmit as () => void}
              contentStyle={styles.contentStyle}
              style={{ borderRadius: scale(10) }}
              labelStyle={styles.labelStyle}
            >
              Đăng nhập
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
