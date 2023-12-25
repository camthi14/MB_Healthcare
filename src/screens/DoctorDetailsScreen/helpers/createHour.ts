type CreateHourPayload = {
  hourStart: number;
  minuteStart: number;
  timeCheckupAvg: number;
  shifts: any[];
  results: any[];
};

export function createHour({
  hourStart,
  minuteStart,
  shifts,
  timeCheckupAvg,
  results,
}: CreateHourPayload): { end: string; start: string }[] {
  if (shifts.length === 0) {
    return results;
  }

  if (results.length) {
    minuteStart += timeCheckupAvg;

    if (minuteStart >= 60) {
      minuteStart = 0;
      hourStart += 1;
    }
  }

  let _minuteEnd = minuteStart + timeCheckupAvg;
  _minuteEnd = _minuteEnd >= 60 ? 0 : _minuteEnd;
  const _hourEnd = _minuteEnd === 0 ? hourStart + 1 : hourStart;

  results.push({
    start: `${hourStart < 10 ? `0${hourStart}` : hourStart}:${
      minuteStart === 0 ? "00" : minuteStart
    }`,
    end: `${_hourEnd < 10 ? `0${_hourEnd}` : _hourEnd}:${_minuteEnd === 0 ? "00" : _minuteEnd}`,
  });

  return createHour({
    hourStart,
    minuteStart,
    shifts: shifts.slice(1),
    timeCheckupAvg,
    results,
  });
}
