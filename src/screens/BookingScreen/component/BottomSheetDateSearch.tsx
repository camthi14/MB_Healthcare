import { ColorSchemas } from "@/constants/colors";
import { SPACING, scale, verticalScale } from "@/utils/scale";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Moment } from "moment";
import React, { FC, useCallback, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

type BottomSheetDateSearchProps = {
  visible: boolean;
  date: Moment;
  onCancel?: () => void;
  onChangeDate?: (date: Moment) => void;
};

const FORMAT = "DD/MM/YYYY";

const BottomSheetDateSearch: FC<BottomSheetDateSearchProps> = ({
  visible,
  date,
  onCancel,
  onChangeDate,
}) => {
  const _initialDate = useMemo(() => {
    if (!date) return new Date();
    return date.toDate();
  }, [date]);

  const onDateChange = useCallback(
    (date: Moment, type: "START_DATE" | "END_DATE") => {
      if (!onChangeDate) return;
      onChangeDate(date);
    },
    [onChangeDate]
  );

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
          <View style={styles.closeModal}>
            <View>
              <Text style={styles.closeModalTitle}>Chọn ngày {date.format(FORMAT)}</Text>
            </View>

            <Pressable onPress={onCancel}>
              <MaterialIcons name="close" color={ColorSchemas.blue} size={24} />
            </Pressable>
          </View>

          <View
            style={{
              zIndex: 1,
              backgroundColor: ColorSchemas.blueLighterV2,
              borderRadius: scale(12),
              padding: scale(10),
            }}
          >
            <CalendarPicker
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
                  style: { backgroundColor: ColorSchemas.blue, zIndex: 100 },
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
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetDateSearch;

const styles = StyleSheet.create({
  wrapBtn: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, gap: 10 },

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

  centeredView: {
    flex: 1,
    zIndex: 1,
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
