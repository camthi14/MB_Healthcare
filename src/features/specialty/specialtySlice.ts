import { ISpecialist } from "@/models/specialty.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: Loading;
  data: ISpecialist[];
  dataSingle: ISpecialist | null;
  error: string;
}

const initialState: InitialState = {
  isLoading: "ready",
  data: [],
  error: "",
  dataSingle: null,
};

const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getDataSuccess: (state, { payload }: PayloadAction<ISpecialist[]>) => {
      state.error = "";
      state.isLoading = "complete";
      state.data = payload;
    },

    getDataFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    getDataSingleStart: (state, _: PayloadAction<number>) => {
      state.error = "";
      state.isLoading = "pending";
    },

    getDataSingleSuccess: (state, { payload }: PayloadAction<ISpecialist | null>) => {
      state.error = "";
      state.isLoading = "complete";
      state.dataSingle = payload;
    },
  },
});

export const specialtyActions = specialtySlice.actions;
export default specialtySlice.reducer;
