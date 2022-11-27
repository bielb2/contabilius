import { wrapRoot } from 'mobx-easy';

import { axios } from 'src/services/baseAPI';

import { RootStore } from './stores/rootStore';

export const createRootStore = (): RootStore => {
  const env = axios;

  return wrapRoot({ RootStore, env });
};
