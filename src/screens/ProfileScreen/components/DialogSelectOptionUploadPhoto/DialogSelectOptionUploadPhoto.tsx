import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ColorSchemas } from "@/constants/colors";

type DialogSelectOptionUploadPhotoProps = {
  visible: boolean;
  onHidden?: () => void;
  onPressSelectOption?: (options: "camera" | "library") => void;
};

const DialogSelectOptionUploadPhoto: FC<DialogSelectOptionUploadPhotoProps> = ({
  visible,
  onHidden,
  onPressSelectOption,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onHidden}>
        <Dialog.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => onPressSelectOption?.("library")}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <MaterialIcons name="library-add" size={50} color={ColorSchemas.blueV2} />
              <View>
                <Text
                  style={{ textAlign: "center", color: ColorSchemas.blueV2, fontWeight: "700" }}
                >
                  Thư viện ảnh
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressSelectOption?.("camera")}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesome name="camera" size={50} color={ColorSchemas.yellowDark} />
              <View>
                <Text
                  style={{ textAlign: "center", color: ColorSchemas.yellowDark, fontWeight: "700" }}
                >
                  Camera
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default DialogSelectOptionUploadPhoto;
