import { BookingType } from "@/models/booking.model";
import { ExaminationCardType, GetCardExamBooking } from "@/models/examinationCard.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: Loading;
  data: ExaminationCardType[];
  dataSingle: ExaminationCardType | null;
  booking: BookingType | null;
  error: string;

  billExists: boolean;
  detailsExists: boolean;
  prescriptionExists: boolean;
}

const initialState: InitialState = {
  isLoading: "ready",
  data: [],
  error: "",
  dataSingle: null,
  booking: null,

  billExists: false,
  detailsExists: false,
  prescriptionExists: false,
};

const examinationCardSlice = createSlice({
  name: "examinationCard",
  initialState,
  reducers: {
    getByBookingIdStart: (state, _: PayloadAction<string>) => {
      state.error = "";
      state.isLoading = "pending";
    },
    getByBookingIdSuccess: (state, { payload }: PayloadAction<GetCardExamBooking>) => {
      state.error = "";
      state.isLoading = "complete";
      state.dataSingle = payload.examCard;
      state.booking = payload.booking;

      state.billExists = payload.billExists;
      state.detailsExists = payload.detailsExists;
      state.prescriptionExists = payload.prescriptionExists;
    },
    getByBookingIdFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = "failed";
    },
  },
});

export const examinationCardActions = examinationCardSlice.actions;
export default examinationCardSlice.reducer;
