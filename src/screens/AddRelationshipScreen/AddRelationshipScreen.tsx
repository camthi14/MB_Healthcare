import Container from "@/components/shared/Container";
import KeyboardFormOverride from "@/components/shared/KeyboardFormOverride";
import AppbarOverride from "@/components/ui/AppbarOverride";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { patientActions } from "@/features/patient/patientSlice";
import { useAppDispatch } from "@/stores/hooks";
import { AddRelationshipPayload } from "@/types/patient";
import { FormikProps } from "formik";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import FormAddRelationship from "./components/FormAddRelationship";

const AddRelationshipScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const formRef = useRef<FormikProps<AddRelationshipPayload> | null>(null);

  const initialValues = useMemo((): AddRelationshipPayload => {
    return {
      birth_date: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      relationship: "mother",
      relatives_id: userId || "",
      gender: "MALE",
    };
  }, [userId]);

  const onPressSubmit = useCallback(() => {
    if (!formRef.current) return;
    formRef.current.handleSubmit();
  }, [formRef]);

  const handleSubmit = useCallback((values: AddRelationshipPayload) => {
    dispatch(appActions.setLoading(true));
    dispatch(patientActions.addRelationshipStart(values));
  }, []);

  return (
    <Container>
      <AppbarOverride title="Thêm thành viên" isGoBack isHome resetBooking />

      <KeyboardFormOverride
        formComponent={
          <View style={{ marginTop: 10 }}>
            <FormAddRelationship
              innerRef={formRef}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            />
          </View>
        }
        labelBtn="Thêm thành viên"
        onPressBtn={onPressSubmit}
      />
    </Container>
  );
};

export default AddRelationshipScreen;
