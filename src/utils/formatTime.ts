import { format, getTime, formatDistanceToNow } from "date-fns";
import vi from "date-fns/locale/vi";
import moment from "moment";

// ----------------------------------------------------------------------

export function fDate(date?: Date | string, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date?: Date | string, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date?: Date | string) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date?: Date | string) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: vi,
      })
    : "";
}

export function fMoment(date?: string | Date, format = "YYYY-MM-DD") {
  return moment(date).format(format);
}

export function selectWeek(date: Date | string) {
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));
}

export function getDaysArray(year: number, month: number) {
  var numDaysInMonth, daysInWeek, daysIndex, index: any, i, l, daysArray;

  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  index = daysIndex[new Date(year, month - 1, 1).toString().split(" ")[0]];
  daysArray = [];

  for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    daysArray.push(i + 1 + ". " + daysInWeek[index++]);
    if (index == 7) index = 0;
  }

  return daysArray;
}
