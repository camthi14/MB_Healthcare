import { IDoctorResponse } from "@/models/doctor.model";
import { IHourObject } from "@/models/scheduleDoctor.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: Loading;
  data: IDoctorResponse[];
  dataSingle: IDoctorResponse | null;
  schedules: IHourObject[];

  error: string;
}

const initialState: InitialState = {
  isLoading: "ready",
  data: [],
  schedules: [],
  error: "",
  dataSingle: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getDataStart: (state, _: PayloadAction<Record<string, any>>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getDataSuccess: (state, { payload }: PayloadAction<IDoctorResponse[]>) => {
      state.error = "";
      state.isLoading = "complete";
      state.data = payload;
    },

    getDataFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    getDataSingleStart: (state, _: PayloadAction<string>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getDataSingleSuccess: (state, { payload }: PayloadAction<IDoctorResponse | null>) => {
      state.error = "";
      state.isLoading = "complete";
      state.dataSingle = payload;
    },

    getSchedulesStart: (state, _: PayloadAction<{ doctorId: string; date: string }>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getSchedulesSuccess: (state, { payload }: PayloadAction<IHourObject[]>) => {
      state.error = "";
      state.isLoading = "complete";
      state.schedules = payload;
    },
  },
});

export const doctorActions = doctorSlice.actions;
export default doctorSlice.reducer;
