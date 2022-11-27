import { getRoot as meGetRoot } from 'mobx-easy';

import { RootStore } from './stores/rootStore';

export const getRoot = (): RootStore => meGetRoot();
