import { SuccessResponseProp } from "@/types/common";
import { AxiosInstance } from "axios";

class BaseAxios {
  private _prefix: string;
  private _lastPrefix: string;
  private _axios: AxiosInstance;

  constructor(prefix: string, axios: AxiosInstance) {
    this._prefix = prefix;
    this._lastPrefix = prefix;
    this._axios = axios;
  }

  public post = async <Data, Response = unknown>(data: Data) => {
    const response: SuccessResponseProp<Response> = await this._axios.post(this._prefix, data);
    return response.metadata;
  };

  public patch = async <Data, Response = unknown>(id: string | number, data: Data) => {
    const response: SuccessResponseProp<Response> = await this._axios.patch(
      `${this._prefix}/${id}`,
      data
    );
    return response.metadata;
  };

  public get = async <Filter = unknown, Response = unknown, Pagination = unknown>(
    filters: Filter
  ) => {
    const response: SuccessResponseProp<Response, Pagination> = await this._axios.get(
      this._prefix,
      {
        params: filters,
      }
    );
    return response;
  };

  public getById = async <Response = unknown>(id: number | string) => {
    const response: SuccessResponseProp<Response> = await this._axios.get(`${this._prefix}/${id}`);
    return response.metadata;
  };

  public useLastPrefix = () => {
    this._prefix = this._lastPrefix;
    return this;
  };

  set prefix(prefix: string) {
    this._prefix = prefix;
  }

  get prefix() {
    return this._prefix;
  }

  get axios() {
    return this._axios;
  }
}

export default BaseAxios;
