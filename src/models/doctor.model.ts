import { IDepartment } from "./department.model";
import { IOperation } from "./operation.model";
import { IPosition } from "./position.model";
import { IQualification } from "./qualification.model";
import { IScheduleDoctor } from "./scheduleDoctor.model";
import { ISpecialist } from "./specialty.model";

export type DoctorsInfo = {
  id?: number;
  doctor_id: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  address?: string;
  desc?: string;
  gender?: "MALE" | "FEMALE";
  created_at?: string;
  updated_at?: string;
};

export interface IDoctor {
  id?: string;
  qualified_doctor_id: number;
  speciality_id: number;
  position_id: number;
  department_id: number;
  display_name: string;
  email?: string;
  email_verified_at?: string;
  phone_number?: string;
  phone_verified_at?: string;
  remember_token?: string | null;
  photo?: string | any;
  status?: "active" | "inactive" | "banned" | "retired";
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  desc?: string;
}

export interface IDoctorResponse extends IDoctor {
  infoData?: DoctorsInfo;
  operation?: null | IOperation;
  specialty?: ISpecialist | null;

  positionData: IPosition | null;
  departmentData: IDepartment | null;
  qualificationData: IQualification | null;
  specialtyData: ISpecialist | null;
  schedules: Omit<IScheduleDoctor, "dataDoctor"> | null;
  scheduleToday: IScheduleDoctor;
}
