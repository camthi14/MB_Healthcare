import Container from "@/components/shared/Container";
import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import { appActions } from "@/features/app";
import { authActions, useAuth } from "@/features/auth";
import { getMessageErrorAxios } from "@/helpers/error.helper";
import PatientApi from "@/services/api/Patient.api";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { MARGIN_BOTTOM_NAV } from "@/utils/scale";
import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import BottomSheetLogout from "./components/BottomSheetLogout";
import DialogSelectOptionUploadPhoto from "./components/DialogSelectOptionUploadPhoto";
import LabelItemIcon from "./components/LabelItemIcon";
import useStyles from "./styles";
import ImageView from "react-native-image-viewing";

const ProfileScreen: FC = () => {
  const styles = useStyles();
  const { user, userId } = useAuth();
  const dispatch = useAppDispatch();

  const logoutBottomSheetRef = useRef<BottomSheetModal>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const [image, setImage] = useState<string[]>([]);

  const handleNavigateEditProfile = useCallback(() => {
    if (!userId) return;
    navigate("EditProfile", { patientId: userId });
  }, []);

  const handleNavigateSecurity = useCallback(() => {
    if (!userId) return;
    navigate("Security", { patientId: userId });
  }, []);

  const handleNavigateRelationship = useCallback(() => {
    navigate("ListRelationship");
  }, []);

  const handleNavigateHelperCenter = useCallback(() => {}, []);

  const handleOnPressLogout = useCallback(() => {
    if (!logoutBottomSheetRef.current) return;
    logoutBottomSheetRef.current.present();
  }, []);

  const handleOnPressCancelLogout = useCallback(() => {
    if (!logoutBottomSheetRef.current) return;
    logoutBottomSheetRef.current.close();
  }, []);

  const handleOnPressAgreeLogout = useCallback(() => {
    if (!logoutBottomSheetRef.current) return;
    logoutBottomSheetRef.current.close();

    dispatch(appActions.setLoading(true));
    dispatch(authActions.logoutStart());
  }, []);

  const handleOnPressChangePhoto = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOnPressUpload = useCallback(
    async (options: "camera" | "library") => {
      setVisible(false);

      if (!userId) return;

      const config: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        quality: 1,
      };

      let results: ImagePicker.ImagePickerResult;

      if (options === "camera") {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();

        if (!granted) {
          dispatch(appActions.setLoading(false));
          return;
        }

        results = await ImagePicker.launchCameraAsync(config);
      } else {
        dispatch(appActions.setLoading(true));

        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
          dispatch(appActions.setLoading(false));
          return;
        }

        results = await ImagePicker.launchImageLibraryAsync(config);
      }

      if (results.canceled) {
        dispatch(appActions.setLoading(false));
        return;
      }

      try {
        dispatch(appActions.setLoading(true));
        const response = await PatientApi.changePhoto(userId, results.assets[0].uri);
        dispatch(authActions.setUser(response));
      } catch (error) {
        let message = getMessageErrorAxios(error);
        dispatch(appActions.setSnackbar({ open: true, text: message, type: "error" }));
      }

      dispatch(appActions.setLoading(false));
    },
    [userId]
  );

  const handlePressImage = useCallback(() => {
    if (!user || !user?.photo) return;
    setImage([user.photo]);
    setVisibleImage(true);
  }, [user]);

  return (
    <Container>
      {image.length ? (
        <ImageView
          images={image.map((r) => ({ uri: r }))}
          visible={visibleImage}
          imageIndex={0}
          onRequestClose={() => setVisibleImage(false)}
        />
      ) : null}

      <DialogSelectOptionUploadPhoto
        visible={visible}
        onHidden={() => setVisible((prev) => false)}
        onPressSelectOption={handleOnPressUpload}
      />

      <BottomSheetLogout
        innerRef={logoutBottomSheetRef}
        onAgreeLogout={handleOnPressAgreeLogout}
        onCancelLogout={handleOnPressCancelLogout}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: MARGIN_BOTTOM_NAV }}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Pressable onPress={handlePressImage}>
                <Image
                  placeholder={BLUR_HASH}
                  contentFit="cover"
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                  transition={500}
                  source={user?.photo ? { uri: user?.photo } : require("@/assets/avatar/avt1.jpg")}
                />
              </Pressable>

              <TouchableOpacity onPress={handleOnPressChangePhoto} style={styles.icon}>
                <Feather name="edit-2" size={15} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.displayNameWrapper}>
              <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
                {user?.display_name}
              </Text>
              <Text variant="bodyMedium" style={{ letterSpacing: 2 }}>
                {user?.phone_number}
              </Text>
            </View>
          </View>

          <View style={[styles.p15, styles.pb15, styles.py15, styles.grid]}>
            <LabelItemIcon label="Chỉnh sửa thông tin" onPress={handleNavigateEditProfile}>
              <Ionicons name="person-outline" size={24} color="black" />
            </LabelItemIcon>

            <LabelItemIcon label="Thành viên gia đình" onPress={handleNavigateRelationship}>
              <MaterialIcons name="family-restroom" size={24} color="black" />
            </LabelItemIcon>

            <LabelItemIcon label="Thay đổi mật khẩu" onPress={handleNavigateSecurity}>
              <MaterialIcons name="security" size={24} color="black" />
            </LabelItemIcon>

            {/* <LabelItemIcon label="Trung tâm hổ trợ" onPress={handleNavigateHelperCenter}>
              <SimpleLineIcons name="info" size={24} color="black" />
            </LabelItemIcon> */}

            <LabelItemIcon
              color={ColorSchemas.red}
              label="Đăng xuất"
              onPress={handleOnPressLogout}
              isShowIcon={false}
            >
              <MaterialIcons name="logout" size={24} color={ColorSchemas.red} />
            </LabelItemIcon>
          </View>

          <View style={styles.bottom}>
            <View
              style={[
                styles.avatar,
                {
                  width: 90,
                  height: 90,
                  borderRadius: 60,
                  backgroundColor: "white",
                  elevation: 1,
                },
              ]}
            >
              <Image
                placeholder={BLUR_HASH}
                contentFit="cover"
                style={{ width: 90, height: 90, borderRadius: 60 }}
                transition={500}
                source={require("@/assets/logo/logo.jpg")}
              />
            </View>

            <View>
              <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
                PHÒNG KHÁM HEALTHY CARE
              </Text>
              <Text variant="bodyMedium">Địa chỉ: ĐẠI HỌC CẦN THƠ</Text>
              <Text variant="bodyMedium">Email: HealthyCare@gmail.com</Text>
              <Text variant="bodyMedium">SĐT: 0106790291</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
