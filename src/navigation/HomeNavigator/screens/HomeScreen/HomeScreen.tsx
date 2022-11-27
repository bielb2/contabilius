import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { useStores } from 'src/store/useStores';

export const HomeScreen = () => {
  const store = useStores();
  const history = useHistory();
  return (
    <button type="button" onClick={() => store.authStore.invalidateSession()}>
      HomeScreen - Logout
    </button>
  );
};
