import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export abstract class AbstractApiModule {
  protected async fetcher<Response, Error = object>(
    endpoint: string,
    config: Omit<AxiosRequestConfig, "url"> = {}
  ) {
    return axios<AxiosError<Error>, AxiosResponse<Response>>(
      endpoint,
      config
    ).then((res) => res.data);
  }
}

export const convertObjectToFormData = (
  object: Record<
    string,
    boolean | number | string | string[] | File | File[] | null
  >
) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((elem) => formData.append(key, elem));
    } else {
      formData.append(
        key,
        typeof value === "number" || typeof value === "boolean"
          ? value.toString()
          : value
      );
    }
  });
  return formData;
};
