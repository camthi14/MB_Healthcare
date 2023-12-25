import { IDepartment } from "./department.model";
import { IPosition } from "./position.model";

export type IOperation = {
  id?: number;
  employee_id?: string;
  doctor_id?: string;
  department_id: number;
  position_id: number;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;

  department?: null | IDepartment;
  position?: null | IPosition;
};
