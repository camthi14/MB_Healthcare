import authApi from "@/services/api/auth.api";
import { useNavigation } from "@react-navigation/native";
import useSWR from "swr";

const useCheckStatus = (userId: number | null | string, apiKey: string | null) => {
  const navigation = useNavigation();

  const { data, error, isLoading, isValidating } = useSWR(
    authApi.getCacheKey({ type: "checkStatus", userId: +userId! }),
    (url) => authApi.checkStatus(+userId!),
    {
      revalidateIfStale: true,
      onSuccess(data, key, config) {
        return data;
      },
      isPaused() {
        return !userId || !apiKey;
      },
    }
  );

  return {
    data: data,
    isLoading: isLoading,
    isValidating: isValidating,
    error: error,
  };
};

export default useCheckStatus;
