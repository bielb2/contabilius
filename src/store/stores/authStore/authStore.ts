import { makeAutoObservable } from 'mobx';

import { UNKNOWN_ERROR } from 'src/constants';
import { api } from 'src/services';
import { LoginPayload, RecoverPasswordPayload, RegisterPayload } from 'src/services/api/auth';
import { apiErrorHandler } from 'src/services/apiErrorHandler';
import { setAuthorization, unsetToken } from 'src/services/baseAPI';
import { UserModel } from 'src/store/model';
import { delay } from 'src/utils';

import * as error from './auth.errorMessages';

type Status = 'unauthenticated' | 'authenticated';

type Authorize = {
  user: UserModel;
  authParams?: {
    token: string;
    keepLogin: boolean;
  };
};

export class AuthStore {
  user: UserModel | undefined = null!;

  userStatus: Status = 'unauthenticated';

  constructor() {
    makeAutoObservable(this);
  }

  reset(): void {
    this.user = undefined;
    this.userStatus = 'unauthenticated';
  }

  // get
  get _user(): UserModel {
    return this.user!;
  }

  // set
  setUser(user: UserModel): void {
    this.user = user;
  }

  setUserStatus(status: Status): void {
    this.userStatus = status;
  }

  authorize({ user, authParams }: Authorize): void {
    if (authParams != null) {
      setAuthorization(authParams);
    }
    this.setUser(user);
    this.setUserStatus('authenticated');
  }

  async invalidateSession(): Promise<{ status: 200 } | undefined> {
    try {
      await Promise.all([this.reset(), unsetToken()]);
      return Promise.resolve({ status: 200 });
    } catch (e: any) {
      apiErrorHandler(e, 'authStore.invalidateSession');
      return undefined;
    }
  }

  async getMe(token: string): Promise<{ status: 200 | HttpErrorStatus } | undefined> {
    try {
      setAuthorization({ token, keepLogin: true });
      const res = await api.auth.getMe(token);

      if (res.status === 200) {
        this.authorize({ user: res.user });
        return Promise.resolve({ status: 200 });
      }

      return { status: res.status };
    } catch (e: any) {
      return undefined;
    }
  }

  async login(payload: LoginPayload): Promise<{ status: 200 }> {
    try {
      await delay();
      const res = await api.auth.login(payload);

      if (res.status === 200) {
        this.authorize({ user: res.user, authParams: { token: res.token, keepLogin: payload.keepLogin } });

        return Promise.resolve({ status: 200 });
      }

      throw new Error(error.LOGIN[res.status] ?? UNKNOWN_ERROR);
    } catch (e: any) {
      return Promise.reject(e.message);
    }
  }

  async register(payload: RegisterPayload): Promise<{ status: 200 }> {
    try {
      await delay();
      const res = await api.auth.register(payload);

      if (res.status === 200) {
        await delay(500);
        this.authorize({ user: res.user, authParams: { token: res.token, keepLogin: payload.keepLogin } });
        return Promise.resolve({ status: 200 });
      }

      throw new Error(error.REGISTER[res.status] ?? UNKNOWN_ERROR);
    } catch (e: any) {
      return Promise.reject(e.message);
    }
  }

  async recoverPassword(payload: RecoverPasswordPayload): Promise<{ status: 200 }> {
    try {
      await delay();
      const res = await api.auth.recoverPassword(payload);

      if (res.status === 200) {
        return Promise.resolve({ status: 200 });
      }

      throw new Error(error.RECOVER_PASSWORD[res.status] ?? UNKNOWN_ERROR);
    } catch (e: any) {
      return Promise.reject(e.message);
    }
  }
}
