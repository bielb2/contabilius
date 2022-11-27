import { ROUTES } from 'src/constants';
import { PrivateRoute } from 'src/router/components';

import { HomeLayout } from './layout';
import { HomeScreen } from './screens';

export const HomeNavigator = (): JSX.Element => (
  <PrivateRoute path={ROUTES.HOME} title="Home" exact component={HomeScreen} layout={HomeLayout} />
);
