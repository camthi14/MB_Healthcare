import SurfaceButton from "@/components/shared/KeyboardFormOverride/SurfaceButton";
import DatePicker from "@/components/ui/form/DatePicker";
import Dropdown from "@/components/ui/form/Dropdown";
import InputLabel from "@/components/ui/form/InputLabel";
import { PatientChangeProfilePayload } from "@/types/patient";
import { SPACING, verticalScale } from "@/utils/scale";
import changeProfileSchema from "@/validations/schemas/changeProfile";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

type Props = {
  initialValues: PatientChangeProfilePayload;
  loading?: boolean;
  onSubmit?: (...args: any) => void;
};

const ProfileForm: React.FC<Props> = ({ initialValues, loading, onSubmit }) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={changeProfileSchema}
      initialValues={initialValues!}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
        return (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <View style={{ flex: 1, padding: SPACING }}>
                <InputLabel
                  label="Họ và chữ lót"
                  placeholder="Họ và chữ lót của bạn"
                  value={values.last_name}
                  onBlur={handleBlur("last_name")}
                  keyboardType="default"
                  onChangeText={handleChange("last_name")}
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />

                <InputLabel
                  label="Tên"
                  placeholder="Tên của bạn"
                  value={values.first_name}
                  onBlur={handleBlur("first_name")}
                  keyboardType="default"
                  onChangeText={handleChange("first_name")}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                />

                <InputLabel
                  label="Số điện thoại"
                  value={values.phone_number}
                  onBlur={handleBlur("phone_number")}
                  placeholder="VD: 0843549558"
                  onChangeText={handleChange("phone_number")}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                />

                <InputLabel
                  label="Địa chỉ"
                  placeholder="Địa chỉ"
                  value={values.address}
                  onBlur={handleBlur("address")}
                  keyboardType="default"
                  onChangeText={handleChange("address")}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />

                <DatePicker
                  value={values.birth_date}
                  defaultValue={initialValues.birth_date}
                  label={`Ngày sinh`}
                  placeholder="DD/MM/YYYY"
                  isCloseAfterSelect
                  onChangeText={handleChange("birth_date")}
                  onBlur={handleBlur("birth_date")}
                  error={touched.birth_date && Boolean(errors.birth_date)}
                  helperText={touched.birth_date && errors.birth_date}
                />

                <View style={{ marginBottom: verticalScale(15) }}>
                  <Dropdown
                    data={[
                      { label: "Nam", value: "MALE" },
                      { label: "Nữ", value: "FEMALE" },
                    ]}
                    label="Giới tính"
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                    value={values.gender!}
                    onChangeValue={handleChange("gender")}
                  />
                </View>

                <InputLabel
                  multiline
                  numberOfLines={3}
                  label="Giới thiệu"
                  placeholder="Giới thiệu bản thân"
                  value={values.desc}
                  onBlur={handleBlur("desc")}
                  keyboardType="default"
                  onChangeText={handleChange("desc")}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
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
        );
      }}
    </Formik>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({});
