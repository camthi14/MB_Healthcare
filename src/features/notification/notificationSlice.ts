import { NotificationType } from "@/models/notification.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: NotificationType[];
  isLoading: Loading;
  error: string;
}

const initialState: InitialState = {
  data: [],
  isLoading: "ready",
  error: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotificationStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.error = "";
      state.isLoading = "pending";
    },

    getNotificationSuccess: (state, { payload }: PayloadAction<NotificationType[]>) => {
      state.isLoading = "complete";
      state.error = "";
      state.data = payload;
    },

    getNotificationFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    updateIsReadStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.error = "";
      state.isLoading = "pending";
    },

    updateIsReadSuccess: (state) => {
      state.isLoading = "complete";
      state.error = "";
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
