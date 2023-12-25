import InputLabel from "@/components/ui/form/InputLabel";
import { BookingForPayload } from "@/types/booking";
import { bookingForSchema } from "@/validations/schemas/bookingInfoCustomerSchema";
import { Formik, FormikProps } from "formik";
import React, { FormEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

type FormBookingSelectProps = {
  initialValues: BookingForPayload;
  onSubmit: (...args: any[]) => void;
};

export type FormBookingSelectRefProps = {
  handleSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
};

const FormBookingSelect = forwardRef<FormBookingSelectRefProps, FormBookingSelectProps>(
  ({ initialValues, onSubmit }, ref) => {
    const formRef = useRef<FormikProps<BookingForPayload> | null>(null);

    useImperativeHandle(ref, () => ({ handleSubmit: formRef.current?.handleSubmit }), [
      formRef.current?.handleSubmit,
    ]);

    return (
      <Formik
        enableReinitialize
        validationSchema={bookingForSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={(values, { resetForm }) => {
          if (!onSubmit) return;
          onSubmit(values, resetForm);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => {
          return (
            <View>
              <InputLabel
                label="Lý do khám (Bắt buộc)"
                multiline
                numberOfLines={3}
                placeholder="Nội dung"
                value={values.reason}
                onBlur={handleBlur("reason")}
                keyboardType="default"
                onChangeText={handleChange("reason")}
                error={touched.reason && Boolean(errors.reason)}
                helperText={touched.reason && errors.reason}
              />
            </View>
          );
        }}
      </Formik>
    );
  }
);

export default FormBookingSelect;
