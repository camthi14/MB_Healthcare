import { getMessageErrorAxios } from "@/helpers/error.helper";
import { IDoctorResponse } from "@/models/doctor.model";
import doctorApi from "@/services/api/doctor.api";
import { SuccessResponseProp } from "@/types/common";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { doctorActions } from "./doctorSlice";
import { IHourObject } from "@/models/scheduleDoctor.model";

type ResponseData = SuccessResponseProp<IDoctorResponse[]>;

function* getData({ payload }: PayloadAction<Record<string, any>>) {
  try {
    const response: ResponseData = yield call(doctorApi.get, { limit: 9999, ...payload });
    yield put(doctorActions.getDataSuccess(response.metadata));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(doctorActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetData() {
  yield takeLatest(doctorActions.getDataStart.type, getData);
}

function* getDataSingle({ payload }: PayloadAction<string>) {
  try {
    const response: IDoctorResponse = yield call(doctorApi.getById, payload);
    yield put(doctorActions.getDataSingleSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(doctorActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetDataSingle() {
  yield takeLatest(doctorActions.getDataSingleStart.type, getDataSingle);
}

function* getSchedule({ payload }: PayloadAction<{ doctorId: string; date: string }>) {
  try {
    const response: IHourObject[] = yield call(doctorApi.getSchedule, payload);
    yield put(doctorActions.getSchedulesSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(doctorActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetSchedule() {
  yield takeLatest(doctorActions.getSchedulesStart.type, getSchedule);
}

function* doctorSaga() {
  yield all([watchGetData(), watchGetDataSingle(), watchGetSchedule()]);
}

export default doctorSaga;
