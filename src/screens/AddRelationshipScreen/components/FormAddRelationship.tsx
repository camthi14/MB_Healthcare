import DatePicker from "@/components/ui/form/DatePicker";
import Dropdown from "@/components/ui/form/Dropdown";
import InputLabel from "@/components/ui/form/InputLabel";
import { optionsRelationship } from "@/models/patient.model";
import { AddRelationshipPayload } from "@/types/patient";
import { verticalScale } from "@/utils/scale";
import { addRelationshipSchema } from "@/validations/schemas/registerSchema";
import { Formik, FormikProps } from "formik";
import React, { FC, RefObject } from "react";
import { View } from "react-native";

interface FormAddRelationshipProps {
  onSubmit?: (...args: any) => void;
  initialValues: AddRelationshipPayload;
  innerRef?: RefObject<FormikProps<AddRelationshipPayload>>;
}

const FormAddRelationship: FC<FormAddRelationshipProps> = ({
  onSubmit,
  initialValues,
  innerRef,
}) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={addRelationshipSchema}
      initialValues={initialValues}
      innerRef={innerRef}
      onSubmit={(values, { resetForm }) => {
        if (!onSubmit) return;
        onSubmit(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
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

          <Dropdown
            data={optionsRelationship}
            label="Quan hệ gia đình"
            value={values.relationship}
            error={touched.relationship && Boolean(errors.relationship)}
            helperText={touched.relationship && errors.relationship}
            onChangeValue={handleChange("relationship")}
            styles={{ marginBottom: verticalScale(12) }}
          />

          <DatePicker
            value={values.birth_date}
            defaultValue={values.birth_date}
            label="Ngày sinh"
            placeholder="DD/MM/YYYY"
            isCloseAfterSelect
            onChangeText={handleChange("birth_date")}
            onBlur={handleBlur("birth_date")}
            error={touched.birth_date && Boolean(errors.birth_date)}
            helperText={touched.birth_date && errors.birth_date}
          />

          <Dropdown
            data={[
              { label: "Nam", value: "MALE" },
              { label: "Nữ", value: "FEMALE" },
            ]}
            label="Giới tính"
            value={values.gender}
            error={touched.gender && Boolean(errors.gender)}
            helperText={touched.gender && errors.gender}
            onChangeValue={handleChange("gender")}
          />
        </View>
      )}
    </Formik>
  );
};

export default FormAddRelationship;
