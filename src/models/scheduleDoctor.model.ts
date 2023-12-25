import { ISessionCheckup } from "./sessionCheckup.model";

export interface IScheduleDoctor {
  id?: number;
  session_checkup_id: number;
  date: string;
  shift_extra: number;
  doctor_id: string;
  sessionData: ISessionCheckup;
  status: "active" | "inactive" | "complete";
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IHourObject {
  id: string;
  schedule_doctor_id?: number;
  time_start: string;
  time_end: string;

  is_booked: boolean | 1 | 0;
  is_remove: boolean | 1 | 0;
  is_cancel: boolean | 1 | 0;

  is_over_time?: boolean;
}
