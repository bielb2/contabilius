import { useState } from 'react';

import { CircularProgress, Stack } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import { useAsync } from 'react-use';

import { AUTH_TOKEN_KEY, theme } from './constants';
import { useLocalStorage } from './hooks';
import { Navigation } from './router';
import { createRootStore, RootStoreProvider } from './store';
import { RootStore } from './store/stores/rootStore';
import { delay } from './utils';

import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const [token] = useLocalStorage<string>(AUTH_TOKEN_KEY);

  useAsync(async () => {
    const store = createRootStore();

    const initRootStore = async () => {
      await delay(800);
      setRootStore(store);
    };

    if (!token) {
      store.authStore.reset();
      initRootStore();
      return;
    }

    const res = await store.authStore.getMe(token);
    const isInvalidToken = res?.status !== 200;

    if (isInvalidToken) {
      await store.authStore.invalidateSession();
    }

    initRootStore();
  }, []);

  if (!rootStore) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <CircularProgress />;
      </Stack>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <RootStoreProvider value={rootStore}>
        <Navigation />
        <ToastContainer />
      </RootStoreProvider>
    </ThemeProvider>
  );
};

export default App;
