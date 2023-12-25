import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import React, { FC } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

type BottomSheetCancelProps = {
  visible: boolean;
  onCancel?: () => void;
  onAgree?: () => void;
};

const BottomSheetCancel: FC<BottomSheetCancelProps> = ({ visible, onCancel, onAgree }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onCancel?.();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              textAlign: "center",
              color: ColorSchemas.red,
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: verticalScale(10),
            }}
          >
            Hủy lịch
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
            Bạn có chắc chắn muốn hủy lịch?
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
              onPress={onCancel}
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
              onPress={onAgree}
            >
              Đồng ý
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetCancel;

const styles = StyleSheet.create({
  wrapBtn: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, gap: 10 },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: SPACING,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: "48%",
    borderRadius: 40,
    paddingVertical: 16,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: ColorSchemas.red,
  },
  buttonAgree: {
    backgroundColor: ColorSchemas.grey,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
