import ButtonOverride from "@/components/ui/ButtonOverride";
import InputLabel from "@/components/ui/form/InputLabel";
import { GenerateChangePayload } from "@/types/patient";
import { verticalScale } from "@/utils/scale";
import changeGenerateProfileSchema from "@/validations/schemas/changeGenerateProfile";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  initialValues: GenerateChangePayload;
  onSubmit?: (...args: any) => void;
};

const GenerateForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={changeGenerateProfileSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <InputLabel
            label="Email"
            placeholder="Email của bạn"
            value={values.email}
            onBlur={handleBlur("email")}
            keyboardType="default"
            onChangeText={handleChange("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            editable={false}
          />
          <InputLabel
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={values.phone_number}
            onBlur={handleBlur("phone_number")}
            keyboardType="default"
            onChangeText={handleChange("phone_number")}
            error={touched.phone_number && Boolean(errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
            editable={false}
          />
          <View style={{ marginTop: verticalScale(20) }}>
            <ButtonOverride label="Lưu thay đổi" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default GenerateForm;

const styles = StyleSheet.create({});
