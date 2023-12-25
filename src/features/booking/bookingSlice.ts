import { BookingMobileState, BookingType } from "@/models/booking.model";
import { IDoctorResponse } from "@/models/doctor.model";
import { IPatient } from "@/models/patient.model";
import { IHourObject } from "@/models/scheduleDoctor.model";
import { ISpecialist } from "@/models/specialty.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  hour: IHourObject | null;
  dateSelectedBooking: string;
  selectedPatient: IPatient | null;
  selectedDoctor: IDoctorResponse | null;
  order: number;
  reason: string;

  isLoading: Loading;
  error: string;
  bookingId: string;

  historyBooking: BookingType[];
  bookingAtHome: boolean;

  specialtySelected: ISpecialist | null;

  openCancel: boolean;
  selectedIdCancel: string;
}

const initialState: InitialState = {
  hour: null,
  dateSelectedBooking: "",
  selectedPatient: null,
  selectedDoctor: null,
  order: 0,
  reason: "",

  isLoading: "failed",
  error: "",
  bookingId: "",

  bookingAtHome: false,
  historyBooking: [],

  specialtySelected: null,

  openCancel: false,
  selectedIdCancel: "",
};

const bookingV2Slice = createSlice({
  name: "bookingV2",
  initialState,
  reducers: {
    setSelectedIdCancel: (state, { payload }: PayloadAction<string>) => {
      state.selectedIdCancel = payload;
    },

    setToggleOpenCancel: (state, { payload }: PayloadAction<boolean>) => {
      state.openCancel = payload;
    },

    setBookingInDoctorDetails: (
      state,
      {
        payload,
      }: PayloadAction<{ hour: IHourObject | null; dateSelectedBooking: string; order: number }>
    ) => {
      state.hour = payload.hour;
      state.dateSelectedBooking = payload.dateSelectedBooking;
      state.order = payload.order;
    },
    setSelectedPatient: (state, { payload }: PayloadAction<IPatient | null>) => {
      state.selectedPatient = payload;
    },
    setSelectedDoctor: (state, { payload }: PayloadAction<IDoctorResponse | null>) => {
      state.selectedDoctor = payload;
    },
    setReason: (state, { payload }: PayloadAction<string>) => {
      state.reason = payload;
    },

    resetBooking: (state) => {
      state.dateSelectedBooking = "";
      state.hour = null;
      state.selectedDoctor = null;
      state.selectedPatient = null;
      state.reason = "";
      state.order = 0;

      if (state.bookingAtHome) {
        state.bookingAtHome = false;
      }

      if (state.bookingAtHome) {
        state.bookingAtHome = false;
        state.specialtySelected = null;
      }
    },

    bookingStart: (state, _: PayloadAction<BookingMobileState>) => {
      state.isLoading = "pending";
      state.error = "";
    },
    bookingSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "complete";
      state.error = "";

      state.bookingId = payload;
      state.dateSelectedBooking = "";
      state.hour = null;
      state.selectedDoctor = null;
      state.selectedPatient = null;
      state.reason = "";
      state.order = 0;

      if (state.bookingAtHome) {
        state.bookingAtHome = false;
        state.specialtySelected = null;
      }
    },
    bookingFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    setBookingAtHome: (state, { payload }: PayloadAction<boolean>) => {
      state.bookingAtHome = payload;
    },

    getHistoryBookingStart: (state, _: PayloadAction<{ id: string; date?: string }>) => {
      state.isLoading = "pending";
      state.error = "";
    },

    getHistoryBookingSuccess: (state, { payload }: PayloadAction<BookingType[]>) => {
      state.isLoading = "complete";
      state.error = "";
      state.historyBooking = payload;
    },

    cancelStart: (state, _: PayloadAction<{ bookingId: string; patientId: string }>) => {
      state.isLoading = "pending";
      state.error = "";
    },

    cancelSuccess: (state) => {
      state.isLoading = "complete";
      state.error = "";
      state.selectedIdCancel = "";
      state.openCancel = false;
    },

    setSpecialtySelected: (state, { payload }: PayloadAction<ISpecialist | null>) => {
      state.specialtySelected = payload;
    },
  },
});

export const bookingActions = bookingV2Slice.actions;
export default bookingV2Slice.reducer;
