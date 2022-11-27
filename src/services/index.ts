import { auth, AuthApi } from './api/auth';

type ApiWrapper = {
  auth: AuthApi;
};

const apiWrapper = (): ApiWrapper => {
  return {
    auth: auth(),
  };
};

export const api = apiWrapper();
