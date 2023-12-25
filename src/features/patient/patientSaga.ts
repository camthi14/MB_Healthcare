import { getMessageErrorAxios } from "@/helpers/error.helper";
import { IPatient } from "@/models/patient.model";
import PatientApi from "@/services/api/Patient.api";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { patientActions } from "./patientSlice";
import { AddRelationshipPayload } from "@/types/patient";
import { goBack } from "@/services/navigation";
import { ResponseGetExamCardAndDetails } from "@/models/prescriptions.model";
import prescriptionApi from "@/services/api/prescription.api";
import { SuccessResponseProp } from "@/types/common";
import { ExaminationCardsDetailType } from "@/models/examinationCardDetails.model";
import examinationCardsDetailsApi from "@/services/api/examinationCardsDetails.api";
import { BillType } from "@/models/bill.model";
import billApi from "@/services/api/bill.api";

export type GetBillCompleted = SuccessResponseProp<BillType[]>;

function* getData({ payload }: PayloadAction<string>) {
  try {
    const response: IPatient = yield call(PatientApi.getRelationship, payload);
    yield put(patientActions.getRelationshipSuccess(response));
  } catch (error) {
    const message = getMessageErrorAxios(error);
    yield put(patientActions.getRelationshipFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetData() {
  yield takeLatest(patientActions.getRelationshipStart.type, getData);
}

function* addRelationship({ payload }: PayloadAction<AddRelationshipPayload>) {
  try {
    yield call(PatientApi.addRelationship, payload);
    yield put(
      appActions.setSnackbar({ open: true, text: "Thêm thành viên thành công", type: "success" })
    );
    yield put(patientActions.addRelationshipSuccess());
    yield call(goBack);
  } catch (error) {
    const message = getMessageErrorAxios(error);
    yield put(patientActions.getRelationshipFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchAddRelationship() {
  yield takeLatest(patientActions.addRelationshipStart.type, addRelationship);
}

function* getPrescriptions({ payload }: PayloadAction<string>) {
  try {
    const response: ResponseGetExamCardAndDetails = yield call(
      prescriptionApi.getPrescriptionsAndDetails,
      payload
    );
    yield put(patientActions.getExaminationCardAndDetailsSuccess(response));
  } catch (error) {
    const message = getMessageErrorAxios(error);
    yield put(patientActions.getRelationshipFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetPrescriptions() {
  yield takeLatest(patientActions.getExaminationCardAndDetailsStart.type, getPrescriptions);
}

function* getExaminationCardDetailsForExamCardId({ payload }: PayloadAction<string>) {
  try {
    const response: SuccessResponseProp<ExaminationCardsDetailType[]> = yield call(
      examinationCardsDetailsApi.get,
      {
        limit: 9999,
        examination_card_id: payload,
        order: "created_at",
      }
    );
    yield put(patientActions.getExaminationCardDetailsSuccess(response.metadata));
  } catch (error) {
    const message = getMessageErrorAxios(error);
    yield put(patientActions.getRelationshipFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetExaminationCardDetailsForExamCardId() {
  yield takeLatest(
    patientActions.getExaminationCardDetailsStart.type,
    getExaminationCardDetailsForExamCardId
  );
}

function* getBill({ payload }: PayloadAction<string>) {
  try {
    const response: GetBillCompleted = yield call(billApi.get, {
      limit: 9999,
      examination_card_id: payload,
    });
    yield put(patientActions.getBillCompleted(response.metadata));
  } catch (error) {
    const message = getMessageErrorAxios(error);
    yield put(patientActions.getRelationshipFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetBill() {
  yield takeLatest(patientActions.getBillStart.type, getBill);
}

function* patientSaga() {
  yield all([
    watchGetData(),
    watchAddRelationship(),
    watchGetPrescriptions(),
    watchGetExaminationCardDetailsForExamCardId(),
    watchGetBill(),
  ]);
}

export default patientSaga;
