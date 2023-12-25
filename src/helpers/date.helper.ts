import { differenceInDays } from "date-fns";
import moment from "moment";

export const convertDate = (date: string | Date) => new Date(date);

export const calcRange = (from: string, to: string) => {
  let mFromDate = convertDate(from);
  let mToDate = convertDate(to);
  let range = differenceInDays(mToDate, mFromDate);
  return { mFromDate, mToDate, range };
};

export const formatDate = (date: string | Date, format = "YYYY-MM-DD") => {
  return moment(convertDate(date)).format(format);
};
