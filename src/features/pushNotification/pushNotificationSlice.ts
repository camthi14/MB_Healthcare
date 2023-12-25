import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  expoPushToken: string;
}

const initialState: InitialState = {
  expoPushToken: "",
};

const pushNotifications = createSlice({
  name: "pushNotifications",
  initialState,
  reducers: {
    setExpoPushToken: (state, { payload }: PayloadAction<string>) => {
      state.expoPushToken = payload;
    },
  },
});

export const pushNotificationsActions = pushNotifications.actions;
export default pushNotifications.reducer;
