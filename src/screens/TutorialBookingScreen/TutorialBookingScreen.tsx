// tsrnfs
import Container from "@/components/shared/Container";
import useGoBack from "@/hooks/useGoBack";
import React, { FC } from "react";
import { Appbar, Text } from "react-native-paper";
import useStyles from "./TutorialBookingStyles";
import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import Alert from "@/components/ui/Alert";
import { SCREEN_HEIGHT, SCREEN_WIDTH, verticalScale } from "@/utils/scale";

type TutorialBookingScreenProps = {};

const TutorialBookingScreen: FC<TutorialBookingScreenProps> = () => {
  const styles = useStyles();
  const { onGoBack } = useGoBack();

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title="Hướng dẫn đặt lịch" />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <View style={{ width: "100%" }}>
            <Alert text="Hướng dẫn đặt lịch khám bệnh tại phòng khám HealthyCare" />
          </View>

          <View>
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/trangchu1.jpg")}
              />
            </View>
            <Alert text="Chọn hồ sơ khám bệnh và chọn chuyên khoa" />
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/chonhoso1.jpg")}
              />
            </View>
            <Alert text="Chọn bác sĩ khám và chọn ngày giờ " />
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/chonbs1.jpg")}
              />
            </View>
            <Alert text="Nhập lý do khám và hoàn thành đặt khám." />
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/lydokham.jpg")}
              />
            </View>
          </View>

          <Alert text="Hướng dẫn quy trình đến khám tại phòng khám" />
          <View>
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/qtkb.jpg")}
              />
            </View>
          </View>

          <Alert text="Sau khi hoàn thành khám tại phòng khám bệnh nhân có thể xem chi tiết thông tin phiếu khám bao gồm thông tin đặt khám, thông tin phiếu khám, xem hóa đơn, xem toa thuốc, xem chỉ định." />
          <View>
            <View
              style={[
                styles.avatar,
                {
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.3),
                  marginBottom: 40,
                },
              ]}
            >
              <Image
                contentFit="contain"
                style={{
                  width: SCREEN_WIDTH,
                  height: verticalScale(SCREEN_HEIGHT / 2.1),
                }}
                transition={500}
                source={require("@/assets/huongdan/chitiephieukham.jpg")}
              />
            </View>
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

export default TutorialBookingScreen;
