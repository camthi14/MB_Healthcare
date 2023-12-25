import { ColorSchemas } from "@/constants/colors";
import { scale, verticalScale } from "@/utils/scale";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FC, RefObject, useMemo } from "react";
import { Text, View } from "react-native";
import { Button, Portal } from "react-native-paper";

type BottomSheetLogoutProps = {
  innerRef: RefObject<BottomSheetModal>;
  onCancelLogout?: () => void;
  onAgreeLogout?: () => void;
};

const BottomSheetLogout: FC<BottomSheetLogoutProps> = ({
  innerRef,
  onCancelLogout,
  onAgreeLogout,
}) => {
  const snapPoints = useMemo(() => ["25%"], []);

  return (
    <Portal>
      <BottomSheetModal
        ref={innerRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: scale(25), elevation: 4 }}
        handleIndicatorStyle={{ backgroundColor: ColorSchemas.greyLighterV2, width: scale(70) }}
      >
        <Text
          style={{
            textAlign: "center",
            color: ColorSchemas.red,
            fontSize: 20,
            fontWeight: "bold",
            paddingBottom: verticalScale(10),
          }}
        >
          Đăng xuất
        </Text>

        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            height: 1,
            backgroundColor: ColorSchemas.greyLighterV2,
          }}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: verticalScale(10),
          }}
        >
          Bạn có chắc chắn muốn đăng xuất?
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: verticalScale(10),
          }}
        >
          <Button
            mode="contained"
            buttonColor={ColorSchemas.blueLighterV3}
            contentStyle={{
              paddingHorizontal: scale(30),
              paddingVertical: verticalScale(5),
            }}
            textColor={ColorSchemas.blueV2}
            labelStyle={{ fontWeight: "700" }}
            style={{
              borderRadius: 70,
            }}
            onPress={onCancelLogout}
          >
            Hủy bỏ
          </Button>
          <Button
            mode="contained"
            buttonColor={ColorSchemas.blueV2}
            contentStyle={{
              paddingHorizontal: scale(30),
              paddingVertical: verticalScale(5),
            }}
            textColor={ColorSchemas.white}
            labelStyle={{ fontWeight: "700" }}
            style={{
              borderRadius: 70,
            }}
            onPress={onAgreeLogout}
          >
            Đồng ý
          </Button>
        </View>
      </BottomSheetModal>
    </Portal>
  );
};

export default BottomSheetLogout;
