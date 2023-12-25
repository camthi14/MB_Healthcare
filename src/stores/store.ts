import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";

const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware(gMD) {
    return gMD({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }).concat([sagaMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
