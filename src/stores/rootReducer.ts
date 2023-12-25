import { appReducer } from "@/features/app";
import { AuthSliceState, authReducer } from "@/features/auth";
import { bookingReducer } from "@/features/booking";
import doctorReducer from "@/features/doctor/doctorSlice";
import examinationCardReducer from "@/features/examinationCard/examinationCardSlice";
import notificationsReducer from "@/features/notification/notificationSlice";
import patientReducer from "@/features/patient/patientSlice";
import pushNotificationsReducer from "@/features/pushNotification/pushNotificationSlice";
import specialtyReducer from "@/features/specialty/specialtySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";

const authPersistConfig: PersistConfig<AuthSliceState> = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["loading", "error"],
  timeout: 0,
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  booking: bookingReducer,
  specialty: specialtyReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  pushNotifications: pushNotificationsReducer,
  notification: notificationsReducer,
  examinationCard: examinationCardReducer,
});

export default rootReducer;
