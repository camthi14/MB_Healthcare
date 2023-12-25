import { CODES, SOMETHING_WRONG_HAPPEN_REFRESH_TOKEN } from "@/constants/code";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import useSWR from "swr";

const useGetProfile = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isValidating } = useSWR(
    authApi.getCacheKey({ type: "getProfile" }),
    authApi.getProfile,
    {
      revalidateIfStale: true,
      onSuccess(data, key, config) {
        if (!data) return;
        dispatch(authActions.setUser(data.metadata));
      },
      onError(err, key, config) {
        const { response } = err;

        dispatch(appActions.setLoading(false));

        if (response && response?.data) {
          const { code } = response.data;

          if (CODES.includes(code)) {
            // TODO: delete auth
            dispatch(appActions.setLoading(true));
            dispatch(authActions.logoutStart());
          }
        }
      },
    }
  );

  return { data, error, isLoading, isValidating };
};

export default useGetProfile;
