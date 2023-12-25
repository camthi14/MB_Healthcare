import { ResultsDiagnosisSubclinical, ResultsImage } from "./resultsDiagnosisSubclinical.model";
import { IRoom } from "./room.model";

export type ISubclinicalType = {
  id?: number;
  name: string;
  subclinical?: ISubclinical[];
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};

export type ISubclinical = {
  id?: number;
  subclinical_type_id: number;
  price: number;
  content: string;
  name: string;
  room_id: number;
  desc: string;
  status?: "active" | "inactive" | "banned";
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  dataRoom?: IRoom | null;

  dataSubclinicalType?: ISubclinicalType | null;
  results?: ResultsDiagnosisSubclinical | null;
  images?: ResultsImage[];
};
