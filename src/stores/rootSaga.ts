import authSaga from "@/features/auth/authSaga";
import bookingSaga from "@/features/booking/bookingSaga";
import doctorSaga from "@/features/doctor/doctorSaga";
import examinationCardSaga from "@/features/examinationCard/examinationCardSaga";
import notificationSaga from "@/features/notification/notificationSaga";
import patientSaga from "@/features/patient/patientSaga";
import specialtySaga from "@/features/specialty/specialtySaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    specialtySaga(),
    doctorSaga(),
    patientSaga(),
    bookingSaga(),
    notificationSaga(),
    authSaga(),
    examinationCardSaga(),
  ]);
}

export default rootSaga;
