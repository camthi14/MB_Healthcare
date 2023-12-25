import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import InputLabel, { InputLabelProps } from "../InputLabel";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import useStyles from "./styles";
import moment from "moment";
import { formatDate } from "@/utils/format";

/**
 * format value `YYYY-MM-DD`
 * @param param0
 * @returns
 */
const DatePickerV2: React.FC<InputLabelProps> = ({ ...props }) => {
  const [show, setShow] = React.useState(false);
  const styles = useStyles(props.error);

  const showDatePicker = React.useCallback(() => {
    setShow(true);
  }, []);

  const hiddenDatePicker = React.useCallback(() => {
    setShow(false);
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    hiddenDatePicker();
    if (!props.onChangeText) return;
    props.onChangeText(moment(currentDate).format("DD/MM/YYYY"));
  };

  const formatValues = React.useMemo(() => {
    if (!props.value) return "";

    if (props.value.length > 10) {
      return formatDate(new Date(props.value), "YYYY-MM-DD");
    }

    return props.value;
  }, [props.value]);

  return (
    <View>
      <InputLabel {...props} value={formatValues} editable={false} placeholder="DD/MM/YYYY" />
      <Pressable style={styles.icon} onPress={showDatePicker}>
        <AntDesign name="calendar" size={24} color={styles.colorIcon.color} />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={
            new Date(
              props.value
                ? props.value.length <= 10
                  ? moment(formatValues, "DD/MM/YYYY").add(1, "day").format()
                  : props.value
                : ""
            )
          }
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          maximumDate={
            new Date(
              moment()
                .subtract(6, "months")
                .subtract(15, "years")
                .endOf("month")
                .format("YYYY-MM-DD")
            )
          }
          // minimumDate={new Date(moment().subtract(16, "years").format("YYYY-MM-DD"))}
        />
      )}
    </View>
  );
};

export default DatePickerV2;

const styles = StyleSheet.create({});
