import { Axios, AxiosRequestConfig } from 'axios';

export type AxiosMethods = {
  get: Axios['get'];
  post: Axios['post'];
  put: Axios['put'];
};

export type AxiosPath<T extends keyof AxiosMethods, K> = {
  [key in T]: (url: string, data?: any, config?: AxiosRequestConfig<any>) => Promise<K>;
};
