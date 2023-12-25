import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import useStyles, { MAX_COLUMN } from "./ActionsHomeStyle";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/stores/hooks";
import { bookingActions } from "@/features/booking";

type CardItemProps = {
  index: number;
  length: number;
  title: string;
  icon: ReactNode;
  onPress: () => void;
};

const CardItem: FC<CardItemProps> = ({ index, length, title, icon, onPress }) => {
  const styles = useStyles();

  const div = useMemo(() => index % 2, [index]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.86}
      style={[
        styles.card,
        index <= MAX_COLUMN && div === 0
          ? { borderBottomWidth: MAX_COLUMN === length ? 0 : 1 }
          : index !== length - 1
          ? div === 0
            ? { borderRightWidth: 1, borderLeftWidth: 1 }
            : index === 1
            ? {
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: MAX_COLUMN === length ? 0 : 1,
              }
            : {}
          : {},
      ]}
    >
      {icon}
      <Text numberOfLines={3} style={styles.cardText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ActionsHome: FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const cards = useMemo(
    (): Pick<CardItemProps, "title" | "icon" | "onPress">[] => [
      {
        title: "Gói khám sức khoẻ",
        icon: <AntDesign name="hearto" size={24} color={styles.cardIconColor.color} />,
        onPress() {
          navigation.navigate("PackageHealthy");
        },
      },
      {
        title: "Lịch sử đặt khám",
        icon: <Feather name="search" size={24} color={styles.cardIconColor.color} />,
        onPress() {
          navigation.navigate("Booking");
        },
      },
      {
        title: "Hướng dẫn",
        icon: <AntDesign name="calendar" size={24} color={styles.cardIconColor.color} />,
        onPress() {
          navigation.navigate("TutorialBooking");
        },
      },
    ],
    []
  );

  const cardLength = cards.length;

  const handleBooking = useCallback(() => {
    dispatch(bookingActions.setBookingAtHome(true));
    navigation.navigate("BookingSelectPatient");
  }, []);

  return (
    <View>
      <View style={[styles.actions, styles.container]}>
        <View style={styles.line} />

        <Button
          onPress={handleBooking}
          mode="contained"
          textColor={styles.buttonTextColor.color}
          style={styles.button}
          labelStyle={styles.labelButton}
          icon={() => (
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={24}
              color={styles.iconColor.color}
            />
          )}
        >
          đặt lịch khám bệnh
        </Button>

        <View style={styles.line} />
      </View>

      <View style={styles.wrapperCard}>
        {cards.map((card, index) => (
          <CardItem key={index} index={index} {...card} length={cardLength} />
        ))}
      </View>
    </View>
  );
};

export default ActionsHome;

const styles = StyleSheet.create({});
