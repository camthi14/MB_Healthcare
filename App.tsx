import Navigation from "@/components/shared/Navigation";
import SnackbarOverride from "@/components/shared/SnackbarOverride";
import OverlayLoading from "@/components/ui/OverlayLoading";
import ToastConfig from "@/components/ui/ToastConfig";
import ThemeContextProvider from "@/contexts/ThemeContext";
import buildProvidersTree from "@/helpers/builderTree";
import rootSaga from "@/stores/rootSaga";
import store, { persistor, sagaMiddleware } from "@/stores/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

sagaMiddleware.run(rootSaga);

const ProvidersTree = buildProvidersTree([
  [Provider, { store }],
  [PersistGate, { loading: null, persistor: persistor }],
  [GestureHandlerRootView, { style: { flex: 1 } }],
  [BottomSheetModalProvider],
  [ThemeContextProvider],
]);

export default function App() {
  return (
    <ProvidersTree>
      <Navigation />
      <SnackbarOverride />
      <Toast config={ToastConfig()} />
      <OverlayLoading />
    </ProvidersTree>
  );
}
