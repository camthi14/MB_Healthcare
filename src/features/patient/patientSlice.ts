import { BillType } from "@/models/bill.model";
import { ExaminationCardsDetailType } from "@/models/examinationCardDetails.model";
import { IPatient } from "@/models/patient.model";
import { ResponseGetExamCardAndDetails } from "@/models/prescriptions.model";
import { Loading } from "@/types/common";
import { AddRelationshipPayload } from "@/types/patient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: Loading;
  data: IPatient | null;
  error: string;

  prescriptions: ResponseGetExamCardAndDetails | null;
  examinationCardDetails: ExaminationCardsDetailType[];

  bills: BillType[];
}

const initialState: InitialState = {
  isLoading: "ready",
  data: null,
  error: "",
  prescriptions: null,
  examinationCardDetails: [],
  bills: [],
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    getRelationshipStart: (state, _: PayloadAction<string>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getRelationshipSuccess: (state, { payload }: PayloadAction<IPatient | null>) => {
      state.error = "";
      state.isLoading = "complete";
      state.data = payload;
    },

    getRelationshipFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    addRelationshipStart: (state, _: PayloadAction<AddRelationshipPayload>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    addRelationshipSuccess: (state) => {
      state.error = "";
      state.isLoading = "complete";
    },

    getExaminationCardAndDetailsStart: (state, _: PayloadAction<string>) => {
      state.isLoading = "pending";
      state.error = "";
    },
    getExaminationCardAndDetailsSuccess: (
      state,
      { payload }: PayloadAction<ResponseGetExamCardAndDetails | null>
    ) => {
      state.isLoading = "complete";
      state.error = "";
      state.prescriptions = payload;
    },

    getExaminationCardDetailsStart: (state, _: PayloadAction<string>) => {
      state.isLoading = "pending";
      state.error = "";
    },
    getExaminationCardDetailsSuccess: (
      state,
      { payload }: PayloadAction<ExaminationCardsDetailType[]>
    ) => {
      state.isLoading = "complete";
      state.error = "";
      state.examinationCardDetails = payload;
    },

    getBillStart: (state, _: PayloadAction<string>) => {
      state.isLoading = "pending";
      state.error = "";
    },
    getBillCompleted: (state, { payload }: PayloadAction<BillType[]>) => {
      state.isLoading = "complete";
      state.error = "";
      state.bills = payload;
    },
  },
});

export const patientActions = patientSlice.actions;
export default patientSlice.reducer;
