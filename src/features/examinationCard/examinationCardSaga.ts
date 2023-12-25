import { getMessageErrorAxios } from "@/helpers/error.helper";
import { GetCardExamBooking } from "@/models/examinationCard.model";
import examinationCardApi from "@/services/api/examinationCard.api";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { examinationCardActions } from "./examinationCardSlice";

function* GetDataByBookingId({ payload }: PayloadAction<string>) {
  try {
    const response: GetCardExamBooking = yield call(examinationCardApi.getByBookingId, payload);

    // console.log(`response GetDataByBookingIdSaga`, JSON.stringify(response, null, 4));

    yield put(examinationCardActions.getByBookingIdSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(examinationCardActions.getByBookingIdFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetDataByBookingId() {
  yield takeLatest(examinationCardActions.getByBookingIdStart.type, GetDataByBookingId);
}

function* examinationCardSaga() {
  yield all([watchGetDataByBookingId()]);
}

export default examinationCardSaga;
