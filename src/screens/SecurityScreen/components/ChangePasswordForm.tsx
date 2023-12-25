import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import InputLabel from "@/components/ui/form/InputLabel";
import { ChangePasswordPayload } from "@/types/patient";
import { SPACING, verticalScale } from "@/utils/scale";
import changePasswordSchema from "@/validations/schemas/ChangePasswordSchema";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

type Props = {
  onSubmit?: (...args: any) => void;
  initialValues: ChangePasswordPayload;
  loading?: boolean;
};

const ChangePasswordForm: React.FC<Props> = ({ onSubmit, loading, initialValues }) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={changePasswordSchema}
      initialValues={initialValues!}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View style={{ flex: 1, padding: SPACING }}>
              <InputLabel
                label="Mật khẩu cũ"
                placeholder="Mật khẩu cũ của bạn"
                value={values.password}
                onBlur={handleBlur("password")}
                keyboardType="default"
                onChangeText={handleChange("password")}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                isSecure
              />
              <InputLabel
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                value={values.newPassword}
                onBlur={handleBlur("newPassword")}
                keyboardType="default"
                onChangeText={handleChange("newPassword")}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                isSecure
              />
              <InputLabel
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                keyboardType="default"
                onChangeText={handleChange("confirmPassword")}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                isSecure
              />
            </View>
          </ScrollView>

          <View style={{ marginTop: verticalScale(20) }}>
            <SurfaceButton
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
              label="Lưu thay đổi"
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
