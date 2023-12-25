import { ColorSchemas } from "@/constants/colors";
import { BookingType } from "./booking.model";
import { BillType } from "./bill.model";

export type ExaminationCardOptions =
  | "service"
  | "subclinical"
  | "doctor.service"
  | "doctor.subclinical"
  | "re_examination"
  | "doctor.re_examination";

export type ExaminationCardStatus =
  | "in_progress"
  | "complete"
  | "pending"
  | "reject"
  | "delay_results"
  | "examination";

export type ExaminationCardType = {
  id?: string;
  order: number;
  booking_id: string;
  note: string;
  status?: ExaminationCardStatus;
  options: ExaminationCardOptions;
  artery?: number | null;
  temperature?: number | null;
  spO2?: number | null;
  breathing_rate?: number | null;
  blood_pressure?: number | null;
  under_blood_pressure?: number | null;
  is_use_service?: boolean;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};

export type GetCardExamBooking = {
  booking: BookingType;
  examCard: ExaminationCardType | null;
  bills: BillType[];
  billExists: boolean;
  detailsExists: boolean;
  prescriptionExists: boolean;
};

export const convertStatusExam = (status: ExaminationCardStatus) => {
  const statuses: Record<ExaminationCardStatus, { text: string; color: string }> = {
    in_progress: {
      text: "Đang xử lý thanh toán",
      color: ColorSchemas.blue,
    },
    complete: {
      text: "Đã hoàn thành",
      color: ColorSchemas.green,
    },
    reject: {
      text: "Lỗi không xác định",
      color: ColorSchemas.red,
    },
    delay_results: {
      text: "Đang chờ kết quả",
      color: ColorSchemas.red,
    },
    examination: {
      text: "Đang khám",
      color: ColorSchemas.blue,
    },
    pending: {
      text: "Chờ khám",
      color: ColorSchemas.yellow,
    },
  };

  return statuses[status];
};

export const convertExaminationCardOptions = (status: ExaminationCardOptions) => {
  const response: Record<ExaminationCardOptions, string> = {
    service: "Khám dịch vụ",
    subclinical: "Khám CLS",
    "doctor.service": "BS CĐ",
    "doctor.subclinical": "BS CĐ",
    re_examination: "Tái khám",
    "doctor.re_examination": "BS CĐ",
  };

  return response[status];
};
