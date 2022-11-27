import { apiErrorHandler } from 'src/services/apiErrorHandler';
import { axios } from 'src/services/baseAPI';
import { UserModel } from 'src/store/model';

import { AuthApi } from './auth.types';

export const auth = (): AuthApi => {
  return {
    register: async (payload) => {
      try {
        const res = await axios.post('/register', payload);

        return {
          status: 200,
          user: new UserModel(res.data.data.user),
          token: String(res.data.data.token),
        };
      } catch (e) {
        return apiErrorHandler(e as Error, 'auth.register');
      }
    },
    login: async (payload) => {
      try {
        const res = await axios.post('/auth', payload);

        return { status: 200, user: new UserModel(res.data.data.user), token: String(res.data.data.token) };
      } catch (e) {
        return apiErrorHandler(e as Error, 'auth.login');
      }
    },
    getMe: async () => {
      try {
        const res = await axios.get('/me');

        return { status: 200, user: new UserModel(res.data.data) };
      } catch (e) {
        return apiErrorHandler(e as Error, 'auth.getMe');
      }
    },
    recoverPassword: async (payload) => {
      try {
        await axios.post('/forgot-password', payload);

        return { status: 200 };
      } catch (e) {
        return apiErrorHandler(e as Error, 'auth.recoverPassword');
      }
    },
  };
};
