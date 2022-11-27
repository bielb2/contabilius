import { AUTH_TOKEN_KEY, CONTABILUS_PREFIX } from 'src/constants';

// NOTE: If you are not inside a react component, you can use the following (setToken, getToken);
// otherwise use useLocalStorage hook

export const setToken = (token: string): void =>
  localStorage.setItem(`${CONTABILUS_PREFIX}@${AUTH_TOKEN_KEY}`, JSON.stringify(token));

export const getToken = (): string | undefined =>
  JSON.parse(localStorage.getItem(`${CONTABILUS_PREFIX}@${AUTH_TOKEN_KEY}`)!) || undefined;
