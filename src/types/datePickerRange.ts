import { Moment } from "moment";
import { MarkedDates } from "react-native-calendars/src/types";

export interface DateRangePickerState {
  isFromDatePicked: boolean;
  isToDatePicked: boolean;
  markedDates: MarkedDates;
  fromDate: string;
  holidayList: Record<string, string>;
}

export type CalendarsPickerRange = {
  selectedStartDate: null | Moment;
  selectedEndDate: null | Moment;
};
