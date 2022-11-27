import { UserModel } from 'src/store/model';

export type RegisterPayload = {
  name: string;
  cnpj?: string;
  password_confirmation: string;
} & LoginPayload;

export type LoginPayload = {
  email: string;
  password: string;
  keepLogin: boolean;
};

export type RecoverPasswordPayload = {
  email: string;
};

export type AuthApi = {
  register: (payload: RegisterPayload) => GenericResponse<{ status: 200; user: UserModel; token: string }>;
  login: (payload: LoginPayload) => GenericResponse<{ status: 200; user: UserModel; token: string }>;
  getMe: (token: string) => GenericResponse<{ status: 200; user: UserModel }>;
  recoverPassword: (payload: RecoverPasswordPayload) => GenericResponse<{ status: 200 }>;
};
