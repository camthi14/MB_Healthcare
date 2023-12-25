import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const useGoBack = () => {
  const navigation = useNavigation();

  const onGoBack = useCallback(() => navigation.goBack(), []);
  const onGoHome = useCallback(() => navigation.navigate("Main"), []);

  return { onGoBack, onGoHome, navigation };
};

export default useGoBack;
