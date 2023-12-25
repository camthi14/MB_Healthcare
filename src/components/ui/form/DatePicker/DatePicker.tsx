import { ColorSchemas } from "@/constants/colors";
import { SCREEN_HEIGHT, SPACING, scale, verticalScale } from "@/utils/scale";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import moment, { Moment } from "moment";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import InputLabel, { InputLabelProps } from "../InputLabel";

type DatePickerProps = {
  isCloseAfterSelect?: boolean;
  minDate?: Date;
} & InputLabelProps;

const DatePicker: FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState<Moment | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["55%", "65%", "85%", SCREEN_HEIGHT], []);
  const styles = useStyles(props.error);
  const lastValue = useRef<string>("");

  useEffect(() => {
    if (!props.defaultValue || lastValue.current !== "") return;

    setDate(moment(new Date(props.defaultValue)));
  }, [props.defaultValue, lastValue.current]);

  const onDateChange = useCallback(
    (date: Moment) => {
      if (!props.onChangeText || !date) return;
      setDate(date);
      lastValue.current = date.toString();
      props.onChangeText(date.toString());
      if (props.isCloseAfterSelect) onClose();
    },
    [props.onChangeText, props.isCloseAfterSelect, lastValue.current]
  );

  const showDatePicker = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef.current]);

  const onClose = useCallback(() => {
    bottomSheetModalRef.current?.close({ duration: 200, dampingRatio: 300 });
  }, [bottomSheetModalRef.current]);

  const dateSelected = useMemo(() => (!date ? null : date.format("DD/MM/YYYY")), [date]);

  const _initialDate = useMemo(() => {
    if (!date) return new Date();
    return date.toDate();
  }, [date]);

  return (
    <View>
      <Pressable style={styles.inputGroup} onPress={showDatePicker}>
        <InputLabel {...props} editable={false} value={dateSelected ?? ""} />

        <Pressable style={styles.icon} onPress={showDatePicker}>
          <AntDesign name="calendar" size={24} color={ColorSchemas.mutedDark} />
        </Pressable>
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: scale(25), elevation: 4 }}
        handleIndicatorStyle={{ backgroundColor: "gray", width: scale(70) }}
      >
        <View style={styles.closeModal}>
          <View>
            <Text style={styles.closeModalTitle}>
              Chọn ngày{dateSelected ? `: ${dateSelected}` : ""}
            </Text>
          </View>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color={ColorSchemas.blue} size={24} />
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: ColorSchemas.blueLighterV2,
            marginHorizontal: SPACING,
            borderRadius: scale(12),
            padding: scale(10),
          }}
        >
          <CalendarPicker
            minDate={props.minDate}
            weekdays={["CN", "T2", "T3", "T4", "T5", "T6", "T7"]}
            months={[
              "Th1",
              "Th2",
              "Th3",
              "Th4",
              "Th5",
              "Th6",
              "Th7",
              "Th8",
              "Th9",
              "Th10",
              "Th11",
              "Th12",
            ]}
            onDateChange={onDateChange}
            initialDate={_initialDate}
            enableDateChange
            customDatesStyles={[
              {
                date: _initialDate,
                style: { backgroundColor: ColorSchemas.blue },
                textStyle: { color: ColorSchemas.white },
              },
            ]}
            selectedDayColor={ColorSchemas.blue}
            selectedDayTextColor="#FFFFFF"
            nextComponent={<MaterialIcons name="navigate-next" size={24} color="black" />}
            previousComponent={<Entypo name="chevron-small-left" size={24} color="black" />}
            customDayHeaderStyles={() => ({
              textStyle: { color: ColorSchemas.black, fontWeight: "bold" },
            })}
            dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default DatePicker;

const useStyles = (error?: boolean) => {
  return StyleSheet.create({
    inputGroup: {
      position: "relative",
    },
    icon: {
      position: "absolute",
      bottom: error ? "44%" : "33%",
      right: 10,
    },
    closeModal: {
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: verticalScale(20),
      marginHorizontal: SPACING,
      marginBottom: verticalScale(19),
      flexDirection: "row",
    },
    closeModalTitle: {
      fontWeight: "bold",
    },
  });
};
