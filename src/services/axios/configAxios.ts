import { CODES } from "@/constants/code";
import {
  ACCESS_TOKEN_HEADER,
  REFRESH_TOKEN_HEADER,
  ROUTE_REFRESH_TOKEN,
  X_CLIENT_ID,
} from "@/constants/headers";
import { BASE_URL } from "@/constants/host";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import store from "@/stores/store";
import { ErrorResponse, LoginResponse, SuccessResponseProp } from "@/types/common";
import axios, { AxiosError } from "axios";

console.log("====================================");
console.log(`BASE_URL: ${BASE_URL}`);
console.log("====================================");

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

let errorCount = 1;

instance.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken, userId } = store.getState().auth;

    // console.log({ accessToken, refreshToken, userId });

    if (accessToken) {
      config.headers[ACCESS_TOKEN_HEADER] = accessToken;
    }

    if (refreshToken) {
      config.headers[REFRESH_TOKEN_HEADER] = refreshToken;
    }

    if (userId) {
      config.headers[X_CLIENT_ID] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ErrorResponse>) => {
    const { config, response } = error;
    errorCount++;

    console.log(
      `error AxiosError ${config?.url} code = ${response?.status}`,
      JSON.stringify(error?.response?.data, null, 4)
    );

    if (response) {
      const { status, data } = response;

      if (errorCount >= 3) {
        errorCount = 0;
        return Promise.reject(error);
      }

      if (Number(status) === 404 && data?.code && CODES.includes(data.code)) {
        store.dispatch(authActions.logoutSuccess());
        return;
      }

      if (Number(status) === 401 && config?.url === ROUTE_REFRESH_TOKEN) {
        console.log(`error axios config refreshToken`, JSON.stringify(data, null, 4));
        errorCount = 0;

        if (data && data?.message && data.message === "jwt expired") {
          store.dispatch(appActions.setLoading(true));
          store.dispatch(authActions.logoutStart());
          return;
        }

        return Promise.reject(error);
      }

      if (Number(status) === 401 && data) {
        const { code, message } = data;

        if (CODES.includes(data.code)) {
          store.dispatch(authActions.logoutSuccess());
          return;
        }

        if (message === "jwt expired") {
          const { accessToken, refreshToken, userId } = store.getState().auth;

          console.log("====================================");
          console.log(`url`, config?.url, data?.message, status);
          console.log("====================================");

          const {
            metadata: { tokens, user },
          }: SuccessResponseProp<LoginResponse> = await instance.post("/Patients/RefreshToken", {
            Headers: {
              [X_CLIENT_ID]: userId,
              [REFRESH_TOKEN_HEADER]: refreshToken,
            },
          });

          store.dispatch(authActions.setAccessToken(tokens.accessToken));
          store.dispatch(authActions.setRefreshToken(tokens.refreshToken));

          instance.defaults.headers.common[ACCESS_TOKEN_HEADER] = tokens.accessToken;
          instance.defaults.headers.common[REFRESH_TOKEN_HEADER] = tokens.refreshToken;

          errorCount = 0;

          return instance(config!);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
