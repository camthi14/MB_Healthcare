import { ColorSchemas } from "@/constants/colors";
import { BillType } from "./bill.model";
import { IDoctorResponse } from "./doctor.model";
import { IPatient } from "./patient.model";
import { IHourObject } from "./scheduleDoctor.model";

export type BookingMobileState = {
  patientId: string;
  hourId: string;
  doctorId: string;
  reason: string;
  date: string;
  price: number;
  order: number;
  images?: string[];
};

export type BookingStatus =
  | "in_progress"
  | "waiting"
  | "completed"
  | "paid"
  | "canceled"
  | "doctor_canceled"
  | "waiting"
  | "examinate";

export type BookingType = {
  id?: string;
  patient_id: string;
  doctor_id: string;
  hour_id: string;

  date: string;
  note?: string;
  reason: string;
  price?: number;

  actor_booking_type?: string;
  actor_booking_value?: string;

  type_patient: "new" | "re_examination";
  status?: BookingStatus;
  order?: number;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  dataHour?: IHourObject;
  bill?: BillType | null;
  dataDoctor?: IDoctorResponse;
  dataPatient?: IPatient;
};

export const convertStatus = (status: BookingStatus) => {
  const statuses: Record<BookingStatus, { text: string; color: string }> = {
    in_progress: {
      text: "Đang tiếp nhận bệnh",
      color: ColorSchemas.blue,
    },
    waiting: {
      text: "Đang chờ đến khám",
      color: ColorSchemas.yellowDark,
    },
    completed: {
      text: "Đã hoàn thành",
      color: ColorSchemas.green,
    },
    paid: {
      text: "Đã thanh toán",
      color: ColorSchemas.greenLight,
    },
    canceled: {
      text: "Đã hủy",
      color: ColorSchemas.red,
    },
    doctor_canceled: {
      text: "Bác sĩ đã hủy",
      color: ColorSchemas.red,
    },
    examinate: {
      text: "Đang khám",
      color: ColorSchemas.blue,
    },
  };

  return statuses[status];
};
