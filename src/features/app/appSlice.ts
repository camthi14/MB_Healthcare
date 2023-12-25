import { SnackbarStatusType } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarType = {
  open: boolean;
  duration: number;
  type: SnackbarStatusType;
  text: string;
};

type SnackbarPayload = {
  open: boolean;
  duration?: number;
  type: SnackbarStatusType;
  text: string;
};

interface AppSliceState {
  loading: boolean;
  asyncStoreIsChange: boolean;
  snackbar: SnackbarType;
}

const initialState: AppSliceState = {
  loading: false,
  asyncStoreIsChange: false,
  snackbar: {
    open: false,
    duration: 7000,
    text: "",
    type: "default",
  },
};

export const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    asyncStoreChange: (state, { payload }: PayloadAction<boolean>) => {
      state.asyncStoreIsChange = payload;
    },
    setSnackbar: (state, { payload }: PayloadAction<SnackbarPayload>) => {
      state.snackbar = { ...state.snackbar, ...payload };
    },
  },
});

const appReducer = appSlice.reducer;

export const appActions = appSlice.actions;
export default appReducer;
