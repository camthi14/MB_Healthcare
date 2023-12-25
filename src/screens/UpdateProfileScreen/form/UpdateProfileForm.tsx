import Dropdown from "@/components/ui/form/Dropdown";
import InputLabel from "@/components/ui/form/InputLabel";
import { UpdateProfilePayload } from "@/types/patient";
import { scale, verticalScale } from "@/utils/scale";
import updateProfileSchema from "@/validations/schemas/updateProfileSchema";
import { Formik } from "formik";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import useStyles from "./styles";

interface UpdateProfileFormProps {
  onSubmit?: (...args: any) => void;
  initialValues: UpdateProfilePayload;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ onSubmit, initialValues }) => {
  const styles = useStyles();

  return (
    <Formik
      enableReinitialize
      validationSchema={updateProfileSchema}
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
            autoComplete="family-name"
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
            autoComplete="family-name"
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />

          <InputLabel
            label="Email"
            value={values.email}
            placeholder="VD: example@gmail.com"
            onBlur={handleBlur("email")}
            onChangeText={handleChange("email")}
            keyboardType="email-address"
            autoComplete="email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <View style={{}}>
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

          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              mode="contained"
              onPress={handleSubmit as () => void}
              contentStyle={styles.contentStyle}
              style={{ borderRadius: scale(10) }}
              labelStyle={styles.labelStyle}
            >
              Tạo
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default UpdateProfileForm;
