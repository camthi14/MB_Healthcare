import DatePicker from "@/components/ui/form/DatePicker";
import InputLabel from "@/components/ui/form/InputLabel";
import useStyles from "@/screens/UpdateProfileScreen/form/styles";
import { RegisterPayload } from "@/types/patient";
import { scale, verticalScale } from "@/utils/scale";
import registerSchema from "@/validations/schemas/registerSchema";
import { Formik } from "formik";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface RegisterFormProps {
  onSubmit?: (...args: any) => void;
  initialValues: RegisterPayload;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, initialValues }) => {
  const styles = useStyles();

  return (
    <Formik
      enableReinitialize
      validationSchema={registerSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <InputLabel
            label="Họ và chữ lót"
            value={values.last_name}
            onBlur={handleBlur("last_name")}
            placeholder="VD: Nguyễn Văn"
            onChangeText={handleChange("last_name")}
            keyboardType="default"
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />

          <InputLabel
            label="Tên"
            value={values.first_name}
            onBlur={handleBlur("first_name")}
            placeholder="VD: A"
            onChangeText={handleChange("first_name")}
            keyboardType="default"
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

          <DatePicker
            value={values.birth_date}
            label="Ngày sinh"
            placeholder="DD/MM/YYYY"
            isCloseAfterSelect
            onChangeText={handleChange("birth_date")}
            onBlur={handleBlur("birth_date")}
            error={touched.birth_date && Boolean(errors.birth_date)}
            helperText={touched.birth_date && errors.birth_date}
          />

          <InputLabel
            label="Mật khẩu"
            value={values.password}
            placeholder="Nhập mật khẩu"
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            isSecure
          />

          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              mode="contained"
              onPress={handleSubmit as () => void}
              contentStyle={styles.contentStyle}
              style={{ borderRadius: scale(10) }}
              labelStyle={styles.labelStyle}
            >
              Đăng ký
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
