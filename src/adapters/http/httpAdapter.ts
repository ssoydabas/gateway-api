import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { log } from '@/utils/logger/logger';

type HttpClient = {
  readonly client: AxiosInstance;
};

type HttpResponse<T> = Promise<AxiosResponse<T>>;
type Headers = Record<string, string>;

const createHttpClient = (
  baseURL: string,
  httpAgent?: unknown,
): HttpClient => ({
  client: axios.create({ baseURL, httpAgent, maxContentLength: 10000 }),
});

const sanitizeHeaders = (headers?: Headers): Headers | undefined => {
  if (!headers) return undefined;
  const { authorization, Authorization, ...sanitized } = headers;
  return sanitized;
};

const get =
  <T>(httpClient: HttpClient) =>
  async (url: string, headers?: Headers): HttpResponse<T> => {
    const startTime = Date.now();
    try {
      log.info(`GET request to ${url}`, {
        url,
        headers: sanitizeHeaders(headers),
      });

      const response = await httpClient.client.get<T>(url, { headers });
      const duration = Date.now() - startTime;

      log.info(`GET response from ${url}`, {
        duration,
        status: response.status,
        data: response.data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

const post =
  <T>(httpClient: HttpClient) =>
  async (url: string, data: unknown, headers?: Headers): HttpResponse<T> => {
    const startTime = Date.now();
    try {
      log.info(`POST request to ${url}`, {
        url,
        payload: data,
        headers: sanitizeHeaders(headers),
      });

      const response = await httpClient.client.post<T>(url, data, { headers });
      const duration = Date.now() - startTime;

      log.info(`POST response from ${url}`, {
        duration,
        status: response.status,
        data: response.data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

const put =
  <T>(httpClient: HttpClient) =>
  async (url: string, data: unknown, headers?: Headers): HttpResponse<T> => {
    const startTime = Date.now();
    try {
      log.info(`PUT request to ${url}`, {
        url,
        payload: data,
        headers: sanitizeHeaders(headers),
      });

      const response = await httpClient.client.put<T>(url, data, { headers });
      const duration = Date.now() - startTime;

      log.info(`PUT response from ${url}`, {
        duration,
        status: response.status,
        data: response.data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

const delete_ =
  <T>(httpClient: HttpClient) =>
  async (url: string, data?: unknown, headers?: Headers): HttpResponse<T> => {
    const startTime = Date.now();
    log.info(`POST request to ${url}`, {
      url,
      payload: data,
      headers: sanitizeHeaders(headers),
    });

    const response = await httpClient.client.delete<T>(url, { data, headers });
    const duration = Date.now() - startTime;

    log.info(`DELETE response from ${url}`, {
      duration,
      status: response.status,
      data: response.data,
    });
    return response;
  };

export const createHttpAdapter = (baseURL: string, httpAgent?: unknown) => {
  const httpClient = createHttpClient(baseURL, httpAgent);

  return {
    get: <T>(url: string, headers?: Headers) =>
      get<T>(httpClient)(url, headers),
    post: <T>(url: string, data: unknown, headers?: Headers) =>
      post<T>(httpClient)(url, data, headers),
    put: <T>(url: string, data: unknown, headers?: Headers) =>
      put<T>(httpClient)(url, data, headers),
    delete: <T>(url: string, data?: unknown, headers?: Headers) =>
      delete_<T>(httpClient)(url, data, headers),
  };
};
