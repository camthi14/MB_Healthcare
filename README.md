- Thời gian của mỗi buổi khám

- Buổi sáng 7h:30 - 11h:30 => 4 tiếng. 4 \* 60

- Buổi sáng 8h -> STT: 18, 24, 25 => gần 12h 4 \* 60 / 25

- 07:00 - 07:30, 07:30 - 08:00, 08:00 - 08:30, 09:00 - 09:30, 09:30 - 10:00, 10:00 - 10:30, 10:30 - 11:00

- Em tới phòng khám, em do phòng em gặp bác sĩ,bác sĩ tư vấn, em đồng ý rồi xong em bắt đầu đi kiểm tra đúng ko?. Rồi trợ lý đưa em cái phiếu,
  cái em đi tới em kiểm tra. Cái phòng đó có kiểm soát trên trang web em không.

- Resolve: Em tới phòng khám --> gặp ông bảo vệ --> gỡ nón bảo hiểm --> bước dô --> gặp người lễ tân (nhân viên tư vấn khám bệnh, đo huyết áp, ...)

--> Nếu lần đầu em tới, thì người ta hỏi em muốn khám gì?. --> Em nói xong. Kiểm tra bước cơ bản (đo huyết áp, ...) --> STT Chờ gặp bác sĩ --> Khoa tim mạch --> Tư vấn gói khám tổng quát. --> OK --> Thanh toán gói khám tổng quát.

--> Người ta đưa em đi khám, kiểm tra cận lâm sàng (xét nghiệm máu, chụp xQuang, ...) --> Đợi STT nếu tới em --> Em mới đi dô khám (gặp BS)

--> Chuẩn đoán bệnh --> Kê toa thuốc --> Đưa toa thuốc cho nhà thuốc --> Chờ nhận thuốc --> Nhận thuốc và thanh toán toa thuốc.

- Resolve: Solution booking and hidden schedule after booked.

- Input: doctor, avg_checkup, date, time_start, time_end.

- Handler:

* `total_timer` of date = time_start - time_end

* `shift_checkup` = `total_timer` \* 60 / `avg_checkup`

* foreach ( `shift` of `shift_checkup`) => `shift`

Ex: doctor_id = 1, avg_checkup = 15p, date = 20/10/2023, time_start = 7h30, time_end = 11h30

- `total_timer` = 4h
- `shift_checkup` = `4h` \* 60p / 15p = 16 shift

```ts
const shifts: IHourObject[] = [...Array(shift_checkup)].map((_, index) => ({
  id: index,
  time_start: "",
  time_end: "",
  is_booked: false,
}));
```

```ts
let hourEnd = 11, hourStart = 7, minuteEnd = 0, minuteStart 0, avgCheckup = 30;
let _lastHourEnd = 0, _lastHourStart = hourStart, _lastMinuteStart = 0, _lastMinuteEnd = 0;

_lastMinuteStart = _lastMinuteStart === 60 ? 0 : _lastMinuteStart;

_lastMinuteStart >= 60 ? _lastMinuteStart = 0 : hourStart - 1;

_lastMinuteStart += avgCheckup;
_lastMinuteEnd = _lastMinuteStart + avgCheckup;
_lastHourStart += 1;
_lastHourEnd = _lastHourStart + 1;

_lastHourEnd = _lastMinuteStart === 60 ? _lastHourEnd - 1 : _lastHourStart + 1;

if (_lastMinuteStart + avgCheckup > 60) {
  _lastMinuteEnd -= 60;
}

const _startTimeValue = _lastHourStart < 10 ? "0" + _lastHourStart : _lastHourStart;
const _secondStartValue = _lastMinuteStart === 60 ? "00" : "30";
const _endTimeValue = _lastHourEnd < 10 ? "0" + _lastHourEnd : _lastHourEnd;
const _secondEndValue = _lastMinuteEnd === 60 ? "00" : "30";




07:00 - 07:30 _lastMinuteStart + 30 => {_lastHourStart}:00 - 07:30
07:30 - 08:00
08:00 - 08:30
09:00 - 09:30
09:30 - 10:00
10:00 - 10:30
10:30 - 11:00

```
