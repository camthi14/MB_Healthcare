import { IPatient } from "@/models/patient.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Status = "verify" | "verified" | null;

export type AuthSliceState = {
  status: Status;
  phoneNumber: string | null;

  user: IPatient | null;

  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;

  loading: Loading;
  error: string;
};

const initialState: AuthSliceState = {
  status: null,
  userId: null,

  phoneNumber: null,

  accessToken: null,
  user: null,
  refreshToken: null,

  loading: "ready",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, { payload: { userId } }: PayloadAction<{ userId: string | null }>) => {
      state.userId = userId;
    },

    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },

    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.phoneNumber = payload;
    },

    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
    },

    setUser: (state, { payload }: PayloadAction<IPatient | null>) => {
      state.user = payload;
    },

    setRefreshToken: (state, { payload }: PayloadAction<string | null>) => {
      state.refreshToken = payload;
    },

    logoutStart: (state) => {
      state.loading = "pending";
      state.error = "";
    },

    logoutSuccess: (state) => {
      state.loading = "complete";
      state.error = "";

      state.refreshToken = null;
      state.accessToken = null;
      state.userId = null;
      state.user = null;
    },

    logoutFailed: (state, { payload }: PayloadAction<string>) => {
      state.loading = "failed";
      state.error = payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
