import { getEnv as mobxGetEnv } from 'mobx-easy';

import { AxiosMethods, AxiosPath } from './types';

export const getEnv = <T extends keyof AxiosMethods, K>(): AxiosPath<T, K> => mobxGetEnv<AxiosPath<T, K>>();
