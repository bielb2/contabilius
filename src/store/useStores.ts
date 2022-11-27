import { useContext, createContext } from 'react';

import { RootStore } from './stores';

const StoreContext = createContext<RootStore>({} as RootStore);

const RootStoreProvider = StoreContext.Provider;

const useStores = (): RootStore => useContext(StoreContext);

export { StoreContext, useStores, RootStoreProvider };
