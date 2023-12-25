import { ISubclinical } from "./subclinical.model";

export interface IServiceType {
  id?: number;
  name: string;
  desc: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IService {
  id?: number;
  service_type_id: number;
  photo?: string | null;
  price: number;
  content: string;
  name: string;
  desc: string;
  subclinicalData?: ISubclinical[];
  status?: "active" | "inactive" | "banned";
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}
