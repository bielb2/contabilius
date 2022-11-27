import { INTERNAL_SERVER_ERROR } from 'src/constants';

type Key = {
  [key in HttpErrorStatus]?: string | undefined;
};

export const LOGIN: Key = {
  ...INTERNAL_SERVER_ERROR,
  401: 'Usuário ou senha inválidos',
  422: 'Usuário ou senha inválidos',
} as const;

export const REGISTER: Key = {
  ...INTERNAL_SERVER_ERROR,
  422: 'O campo email já está sendo utilizado.',
} as const;

export const RECOVER_PASSWORD: Key = {
  ...INTERNAL_SERVER_ERROR,
  422: 'Email inexistente em nossa base de dados',
} as const;
