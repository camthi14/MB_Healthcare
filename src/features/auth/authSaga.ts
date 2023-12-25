import { getMessageErrorAxios } from "@/helpers/error.helper";
import authApi from "@/services/api/auth.api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { authActions } from "./authSlice";

function* logoutSaga() {
  try {
    yield call(authApi.logout);
    yield put(authActions.logoutSuccess());
    yield put(
      appActions.setSnackbar({ open: true, text: "Bạn đã đăng xuất thành công", type: "success" })
    );
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
    yield put(authActions.logoutFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchLogoutSaga() {
  yield takeLatest(authActions.logoutStart.type, logoutSaga);
}

function* authSaga() {
  yield all([watchLogoutSaga()]);
}

export default authSaga;
