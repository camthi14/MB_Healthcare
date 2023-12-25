import { IPerson, IPersonInformation } from "./person.model";

export type PatientStatusType = "active" | "inactive" | "waiting";
export type RelationshipType = "me" | "mother" | "father" | "others" | "married_couple";

export interface IPatientType {
  id?: number;
  name: string;
  desc: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPatientInformation extends IPersonInformation {
  patient_id: string;
}

export interface IPatient extends IPerson {
  patient_type_id: number;
  status?: PatientStatusType;
  relationship: RelationshipType;
  otp_token?: string | null;
  infoData?: IPatientInformation | null;
  relatives_id?: string | null;
  relatives?: IPatient[] | null;
}

export const convertRelationship = (relationship: RelationshipType) =>
  ({
    me: "Tôi",
    mother: "Mẹ",
    father: "Cha",
    others: "Khác",
    married_couple: "Vợ, chồng",
  }[relationship]);

export const optionsRelationship = [
  { label: "Mẹ", value: "mother" },
  { label: "Cha", value: "father" },
  { label: "Khác", value: "others" },
  { label: "Vợ chồng", value: "married_couple" },
];
