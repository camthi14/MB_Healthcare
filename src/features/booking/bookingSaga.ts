import { getMessageErrorAxios } from "@/helpers/error.helper";
import { BookingMobileState, BookingType } from "@/models/booking.model";
import bookingApi from "@/services/api/booking.api";
import { navigate } from "@/services/navigation";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { bookingActions } from "./bookingSlice";

function* booking({ payload }: PayloadAction<BookingMobileState>) {
  try {
    const response: string = yield call(bookingApi.booking, payload);
    yield call(navigate, "BookingSuccess");
    yield put(bookingActions.bookingSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchBooking() {
  yield takeLatest(bookingActions.bookingStart.type, booking);
}

function* getHistoryBooking({ payload }: PayloadAction<{ id: string; date?: string }>) {
  try {
    const response: BookingType[] = yield call(bookingApi.getHistory, payload.id, payload.date);
    yield put(bookingActions.getHistoryBookingSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetHistoryBooking() {
  yield takeLatest(bookingActions.getHistoryBookingStart.type, getHistoryBooking);
}

function* Cancel({ payload }: PayloadAction<{ bookingId: string; patientId: string }>) {
  try {
    yield call(bookingApi.cancel, payload.bookingId);
    yield put(bookingActions.getHistoryBookingStart({ id: payload.patientId }));
    yield put(bookingActions.cancelSuccess());
    yield put(appActions.setSnackbar({ open: true, text: "Hủy lịch thành công", type: "success" }));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchCancel() {
  yield takeLatest(bookingActions.cancelStart.type, Cancel);
}

function* bookingSaga() {
  yield all([watchBooking(), watchGetHistoryBooking(), watchCancel()]);
}

export default bookingSaga;
