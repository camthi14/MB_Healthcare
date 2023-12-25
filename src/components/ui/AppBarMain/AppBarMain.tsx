import { ColorSchemas } from "@/constants/colors";
import { BLUR_HASH } from "@/constants/common";
import useGoBack from "@/hooks/useGoBack";
import { scale } from "@/utils/scale";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { FC, useCallback } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

type AppBarMainProps = {
  isBack?: boolean;
  count?: number;
};

const AppBarMain: FC<AppBarMainProps> = ({ isBack, count = 0 }) => {
  const navigation = useNavigation();
  const { onGoBack } = useGoBack();

  const handleOnPressNotification = useCallback(() => {
    navigation.navigate("Notifications");
  }, []);
  return (
    <Appbar.Header>
      {isBack ? <Appbar.BackAction onPress={onGoBack} /> : null}

      {isBack ? null : (
        <Appbar.Action
          animated={false}
          size={70}
          icon={() => (
            <Image
              source={require("@/assets/logo/logo.jpg")}
              style={{ width: scale(70), height: scale(70) }}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={1000}
            />
          )}
        />
      )}

      <Appbar.Content title="" />

      <Appbar.Action
        animated={false}
        onPress={handleOnPressNotification}
        icon={() => (
          <View style={{ position: "relative", flexDirection: "row" }}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={count >= 1 ? ColorSchemas.blue : ColorSchemas.black}
            />

            {count >= 1 ? (
              <View>
                <Text style={{ color: ColorSchemas.blue }}>{count}</Text>
              </View>
            ) : null}
          </View>
        )}
      />

      {/* <Appbar.Action
        animated={false}
        icon={() => <AntDesign name="infocirlceo" size={24} color={ColorSchemas.black} />}
      /> */}
    </Appbar.Header>
  );
};

export default AppBarMain;
