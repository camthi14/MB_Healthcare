import { ColorSchemas } from "@/constants/colors";
import { formatDate } from "@/helpers/date.helper";
import { BookingType, convertStatus } from "@/models/booking.model";
import { navigate } from "@/services/navigation";
import { handleCompareTimeWithTime } from "@/utils/common";
import dayjs from "dayjs";
import React, { FC, memo, useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import BookingItemLabel from "./BookingItemLabel";
import useStyles from "./BookingItemStyles";

type BookingItemProps = {
  row: BookingType;
  isNavigate?: boolean;
  isSeeDetails?: boolean;
  loading?: boolean;
  onCancel?: (row: BookingType) => void;
};

const BookingItem: FC<BookingItemProps> = ({
  row,
  isNavigate = true,
  isSeeDetails,
  loading,
  onCancel,
}) => {
  const styles = useStyles(isSeeDetails);

  const handleOnSeeDetails = useCallback(() => {
    if (!row.id || !isNavigate) return;
    navigate("DetailsExamination", { bookingId: row.id! });
  }, [row, isNavigate]);

  const status = useMemo(() => convertStatus(row.status!), [row.status]);

  const isOverTime = useMemo(() => {
    const isToday = dayjs(new Date(row.date)).isToday();

    if (!isToday) return false;

    const isOver = handleCompareTimeWithTime({
      hourStart: row.dataHour?.time_start!,
      hourEnd: row.dataHour?.time_end!,
      time: -30, // 1h
    });

    if (isOver) return true;

    return false;
  }, [row]);

  const checkOutDateIsWaiting = useMemo(() => {
    if (row.status !== "waiting" || dayjs(row.date).isToday()) return false;

    // So sánh nếu ngày date lớn hơn ngày hiện tại (ngày hiện tại - ngày đặt khám)
    if (dayjs().diff(dayjs(row.date), "days", true) < 0) {
      return false;
    }

    return true;
  }, [row]);

  return (
    <TouchableOpacity activeOpacity={0.65} style={styles.surface} onPress={handleOnSeeDetails}>
      <BookingItemLabel label="Số thứ tự" value={`${row.order}`} />

      <BookingItemLabel label="Mã đặt lịch" value={row?.id || ""} />

      {isSeeDetails ? (
        <>
          <BookingItemLabel
            label="Bác sĩ"
            color={ColorSchemas.blueV2}
            value={`${row?.dataDoctor?.qualificationData?.character} ${row?.dataDoctor?.display_name}`}
          />
          <BookingItemLabel
            label="Chuyên khoa"
            color={ColorSchemas.blueV2}
            value={`${row?.dataDoctor?.specialtyData?.name}`}
          />
        </>
      ) : null}

      <BookingItemLabel label="Bệnh nhân" value={row?.dataPatient?.display_name || ""} />

      <BookingItemLabel label="Ngày khám" value={formatDate(row?.date, "DD/MM/YYYY") || ""} />

      <BookingItemLabel
        label="Ca Khám"
        value={`${row?.dataHour?.time_start} - ${row?.dataHour?.time_end}` || ""}
      />

      <BookingItemLabel label="Trạng thái" value={status.text || ""} color={status.color} />

      <BookingItemLabel label="Lý do khám" value={row.reason || ""} />

      <BookingItemLabel
        label="Thời gian đã đặt"
        value={formatDate(row.created_at!, "DD/MM/YYYY HH:mm") || ""}
      />

      {row.status === "canceled" ? (
        <BookingItemLabel
          label="Thời gian đã hủy"
          color={ColorSchemas.red}
          value={formatDate(row.updated_at!, "DD/MM/YYYY HH:mm") || ""}
        />
      ) : null}

      {checkOutDateIsWaiting ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: ColorSchemas.red, fontWeight: "bold" }}>
            Bệnh nhân đã không đến khám
          </Text>
        </View>
      ) : null}

      {onCancel ? (
        isOverTime || checkOutDateIsWaiting ? null : row.status === "waiting" ? (
          <View style={{ marginTop: 10 }}>
            <View>
              <Button
                disabled={loading}
                loading={loading}
                onPress={() => onCancel?.(row)}
                mode="contained"
                buttonColor={ColorSchemas.blueLighterV3}
                textColor={ColorSchemas.blueV2}
                labelStyle={{ fontWeight: "700" }}
                style={{
                  borderRadius: 70,
                }}
              >
                Hủy lịch
              </Button>
            </View>
          </View>
        ) : null
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(BookingItem);
