import Axios from 'axios';
import { toast } from 'react-toastify';

import { delay, getToken, setToken } from 'src/utils';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axios = Axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 10000,
  validateStatus: (status: number): boolean => status === 200,
});

const setAuthorization = ({ token, keepLogin = false }: { token: string; keepLogin?: boolean }): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  if (keepLogin) {
    setToken(token);
  }
};

const unsetToken = async (): Promise<void> => {
  localStorage.clear();
  delete axios.defaults.headers.common.Authorization;
  await delay(1000);
  // window.location.href = '/';
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = (error.response?.status ?? 500) as HttpErrorStatus;
    const message = error.response?.data.message ?? 'Internal server error';

    if (status !== 401) {
      return Promise.reject(error);
    }

    // Unauthenticated

    const hasToken = getToken();

    if (hasToken) {
      toast.error(message ?? 'Unauthenticated');
      unsetToken();
    }

    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (config) => {
    const _config = config;
    if (_config.headers != null) {
      _config.headers.Accept = 'application/json';
    }

    return _config;
  },
  (error) => Promise.reject(error.response.message),
);

export { axios, setAuthorization, unsetToken };
