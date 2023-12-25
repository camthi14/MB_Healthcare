import { getMessageErrorAxios } from "@/helpers/error.helper";
import { ISpecialist } from "@/models/specialty.model";
import specialtyApi from "@/services/api/specialty.api";
import { SuccessResponseProp } from "@/types/common";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { specialtyActions } from "./specialtySlice";
import { PayloadAction } from "@reduxjs/toolkit";

type ResponseData = SuccessResponseProp<ISpecialist[]>;

function* getData() {
  try {
    const response: ResponseData = yield call(specialtyApi.get, { limit: 9999 });
    yield put(specialtyActions.getDataSuccess(response.metadata));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(specialtyActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetData() {
  yield takeLatest(specialtyActions.getDataStart.type, getData);
}

function* getDataSingle({ payload }: PayloadAction<number>) {
  try {
    const response: ISpecialist = yield call(specialtyApi.getById, payload);
    yield put(specialtyActions.getDataSingleSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(specialtyActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetDataSingle() {
  yield takeLatest(specialtyActions.getDataSingleStart.type, getDataSingle);
}

function* specialtySaga() {
  yield all([watchGetData(), watchGetDataSingle()]);
}

export default specialtySaga;
