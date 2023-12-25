import Container from "@/components/shared/Container";
import { useGlobalStyles } from "@/components/shared/GlobalStyles";
import { ColorSchemas } from "@/constants/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import useStyles from "./BookingSuccessfulScreenStyles";
import { Image } from "expo-image";

type BookingSuccessfulScreenProps = {};

const BookingSuccessfulScreen: FC<BookingSuccessfulScreenProps> = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useNavigation();

  const handleOnPressNavigationHome = useCallback(() => {
    navigation.navigate("Main");
  }, []);

  const handleOnPressBookingResults = useCallback(() => {
    navigation.navigate("Booking");
  }, []);

  return (
    <Container style={[styles.container, styles.p]}>
      <View style={styles.container}>
        {/* <View>
          <View style={[styles.roundedIcon, styles.container]}>
            <View style={[styles.wrapperIcon, styles.container]}>
              <View>
                <Entypo
                  name="check"
                  size={styles.iconSize.fontSize}
                  color={styles.iconColor.color}
                />
              </View>
            </View>
          </View>

          <View style={styles.circleV1TopLeft} />
          <View style={styles.circleV2TopRight} />
          <View style={styles.circleV3BottomLeft} />
          <View style={styles.circleV3BottomLeftV2} />
          <View style={styles.circleV5BottomCenter} />
          <View style={styles.circleV6TopBottomRightCenter} />
          <View style={styles.circleV7TopRightLeftCenter} />
          <View style={styles.circleV8BottomRight} />
          <View style={styles.circleV9TopBottomLeftCenter} />
        </View> */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "white",
              marginBottom: 5,
            }}
          >
            <Image
              contentFit="cover"
              style={{ width: 120, height: 120, borderRadius: 60 }}
              transition={500}
              source={require("@/assets/logo/logo.jpg")}
            />
          </View>
          <Text style={{ fontWeight: "700" }}>PHÒNG KHÁM HEALTHY CARE</Text>
          <Text style={{ letterSpacing: 2, marginTop: 2, fontStyle: "italic" }}>
            Nền tảng y tế chăm sóc sức khỏe
          </Text>
          <Text style={{ letterSpacing: 2 }}>Đơn giản - Nhanh chóng - Nhiệt Tình</Text>
        </View>
        <View style={styles.spacingY} />

        <Text style={styles.title}>Bạn đã đặt lịch thành công</Text>

        <View style={styles.spacingYBtn} />

        <View style={styles.spacingY} />

        <Button
          style={globalStyles.surfaceBtnBottom}
          contentStyle={[globalStyles.surfaceBtnContentStyles, { minWidth: 250 }]}
          labelStyle={{ fontWeight: "bold" }}
          onPress={handleOnPressBookingResults}
          mode="contained"
          buttonColor={ColorSchemas.green}
        >
          Xem chi tiết
        </Button>

        <View style={styles.spacingYBtn} />

        <Button
          style={globalStyles.surfaceBtnBottom}
          contentStyle={[globalStyles.surfaceBtnContentStyles, { minWidth: 250 }]}
          labelStyle={{ color: ColorSchemas.green, fontWeight: "bold" }}
          onPress={handleOnPressNavigationHome}
          mode="contained"
          buttonColor={ColorSchemas.greenLight}
        >
          Trở về trang chủ
        </Button>
      </View>
    </Container>
  );
};

export default BookingSuccessfulScreen;
