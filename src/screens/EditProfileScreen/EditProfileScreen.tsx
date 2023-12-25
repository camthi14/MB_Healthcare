import Container from "@/components/shared/Container";
import AppbarOverride from "@/components/ui/AppbarOverride";
import HelperText from "@/components/ui/form/Input/HelperText";
import { appActions, useLoading } from "@/features/app";
import { formatDate } from "@/helpers/date.helper";
import { getMessageErrorAxios } from "@/helpers/error.helper";
import { IPatient } from "@/models/patient.model";
import PatientApi from "@/services/api/Patient.api";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { RootStackParamList } from "@/types/navigation";
import { PatientChangeProfilePayload } from "@/types/patient";
import { filterObj, getInfoData, removeNullObj } from "@/utils/object";
import { SPACING, scale } from "@/utils/scale";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { mutate } from "swr";
import ProfileForm from "./components/ProfileForm";

const EditProfileScreen: FC = () => {
  const {
    params: { patientId },
  } = useRoute<RouteProp<RootStackParamList, "EditProfile">>();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IPatient | null>(null);
  const [error, setError] = useState("");
  const loading = useLoading();

  useEffect(() => {
    if (!patientId) return;

    (async () => {
      try {
        dispatch(appActions.setLoading(true));
        const response = await PatientApi.getById<IPatient>(patientId);
        setUser(response);
      } catch (error) {
        let message = getMessageErrorAxios(error);
        setError(message);
        dispatch(appActions.setSnackbar({ open: true, text: message, type: "error" }));
      } finally {
        dispatch(appActions.setLoading(false));
      }
    })();
  }, [patientId]);

  const initialValues = useMemo((): PatientChangeProfilePayload => {
    if (!user)
      return filterObj({
        address: "",
        birth_date: "",
        desc: "",
        first_name: "",
        gender: undefined,
        last_name: "",
        phone_number: "",
      });

    return {
      address: user.infoData?.address || "",
      birth_date: user.infoData?.birth_date || "",
      desc: user.infoData?.desc || "",
      first_name: user.infoData?.first_name || "",
      gender: user.infoData?.gender || undefined,
      last_name: user.infoData?.last_name || "",
      phone_number: user.phone_number,
    };
  }, [user]);

  const handleSubmit = useCallback(
    async (values: PatientChangeProfilePayload) => {
      if (!patientId) return;

      const data = removeNullObj(
        getInfoData(
          {
            ...values,
            birth_date: values.birth_date ? formatDate(values.birth_date, "YYYY-MM-DD") : "",
          },
          ["address", "birth_date", "desc", "first_name", "last_name", "gender", "phone_number"]
        )
      );

      dispatch(appActions.setLoading(true));
      setError("");

      try {
        const response = await authApi.changeProfile(patientId, data as any);
        mutate(authApi.getCacheKey({ type: "getProfile" }), response, {
          rollbackOnError: true,
          populateCache: true,
          revalidate: true,
        });
        ToastAndroid.showWithGravity("Thay đổi thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
      } catch (error: any) {
        let message = getMessageErrorAxios(error);
        setError(message);
        dispatch(appActions.setSnackbar({ open: true, text: message, type: "error" }));
      } finally {
        dispatch(appActions.setLoading(false));
      }
    },
    [patientId]
  );

  return (
    <Container>
      <AppbarOverride title="Chỉnh sửa thông tin" isGoBack />

      <View style={{ flex: 1 }}>
        {error && (
          <View style={{ marginTop: scale(15), paddingHorizontal: SPACING }}>
            <HelperText fontSize="H5" type="error" text={error} visible />
          </View>
        )}

        <ProfileForm loading={loading} initialValues={initialValues} onSubmit={handleSubmit} />
      </View>
    </Container>
  );
};

export default EditProfileScreen;
