import dayjs from "dayjs";

export const getHourAndMinusCurrent = (time: string) => {
  return dayjs().format(`YYYY-MM-DD  ${time}`);
};

export const handleCompareTimeWithTime = ({
  hourEnd,
  hourStart,
  time,
}: {
  hourStart: string;
  hourEnd: string;
  time: number;
}) => {
  const start = dayjs(getHourAndMinusCurrent(hourStart));
  const end = dayjs(getHourAndMinusCurrent(hourEnd));
  const current = dayjs();

  let startCompare = current.diff(start, "minutes", true);
  let endCompare = current.diff(end, "minutes", true);

  if (startCompare >= time || endCompare >= time) return true;

  return false;
};
