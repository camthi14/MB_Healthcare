import { ColorSchemas } from "@/constants/colors";
import { ResultsDiagnosisSubclinical, ResultsImage } from "./resultsDiagnosisSubclinical.model";
import { IService } from "./service.model";
import { ISubclinical } from "./subclinical.model";

export type ExaminationCardsDetailStatus = "required" | "finished" | "unfinished";

export type ExaminationCardsDetailType = {
  id?: string;
  examination_card_id: string;
  service_entity: string;
  service_value: string;
  doctor_id?: string | null;

  serviceData?: null | IService;
  subclinicalData?: null | ISubclinical[] | ISubclinical;
  results?: null | ResultsDiagnosisSubclinical;

  images?: ResultsImage[];

  status?: ExaminationCardsDetailStatus;
  doctorName?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};

export const convertExaminationCardDetailStatusColor = (status: ExaminationCardsDetailStatus) =>
  ({
    required: ColorSchemas.yellowDark,
    finished: ColorSchemas.green,
    unfinished: ColorSchemas.red,
  }[status]);

export const convertExaminationCardDetailStatus = (status: ExaminationCardsDetailStatus) =>
  ({
    required: "Yêu cầu thực hiện",
    finished: "Hoàn thành",
    unfinished: "Chưa hoàn thành",
  }[status]);
