import ButtonGradient from "@/components/ui/ButtonGradient";
import Dropdown from "@/components/ui/form/Dropdown";
import Input from "@/components/ui/form/Input";
import { patient } from "@/types/patient";
import { scale, verticalScale } from "@/utils/scale";
import registerSchema from "@/validations/schemas/registerSchema";
import { Formik } from "formik";
import React, { FC } from "react";
import { View } from "react-native";

interface RegisterFormProps {
  onSubmit?: (...args: any) => void;
  initialValues: patient;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, initialValues }) => {
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
          <Input
            label="Họ"
            value={values.last_name}
            onBlur={handleBlur("last_name")}
            placeholder="Nhập họ"
            onChangeText={handleChange("last_name")}
            styleView={{ marginBottom: verticalScale(10) }}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />

          <Input
            label="Tên"
            value={values.first_name}
            placeholder="Nhập tên"
            onBlur={handleBlur("first_name")}
            onChangeText={handleChange("first_name")}
            styleView={{ marginBottom: verticalScale(10) }}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />

          <Input
            label="Tài khoản"
            value={values.username}
            placeholder="Nhập tài khoản"
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
            keyboardType="default"
            styleView={{ marginBottom: verticalScale(10) }}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

          <Input
            label="Mật khẩu"
            value={values.password}
            placeholder="Nhập mật khẩu"
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            keyboardType="default"
            styleView={{ marginBottom: verticalScale(10) }}
            isSecure
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Input
            label="Email"
            value={values.email}
            placeholder="Nhập email"
            onBlur={handleBlur("email")}
            onChangeText={handleChange("email")}
            keyboardType="email-address"
            styleView={{ marginBottom: verticalScale(10) }}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <Input
            label="Số điện thoại"
            value={values.phone_number}
            placeholder="Nhập số điện thoại"
            onBlur={handleBlur("phone_number")}
            onChangeText={handleChange("phone_number")}
            keyboardType="phone-pad"
            styleView={{ marginBottom: verticalScale(10) }}
            error={touched.phone_number && Boolean(errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />

          <View style={{}}>
            <Dropdown
              data={[
                { label: "Nam", value: "MALE" },
                { label: "Nữ", value: "FEMALE" },
                { label: "Khác", value: "OTHER" },
              ]}
              label="Giới tính"
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
              value={values.gender!}
              onChangeValue={handleChange("gender")}
            />
          </View>

          <View style={{ marginTop: verticalScale(20) }}>
            <ButtonGradient
              text={"Tạo tài khoản"}
              labelStyle={{ color: "white", fontSize: 17 }}
              color={["#000000", "#000000"]}
              contentStyle={{ paddingVertical: 6 }}
              borderRadius={scale(10)}
              onPress={handleSubmit}
              // disabled
              // loading
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
