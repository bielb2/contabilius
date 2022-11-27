import { ROUTES } from 'src/constants';
import { PublicRoute } from 'src/router/components';

import { LoginScreen } from './screens';

export const LoginNavigator = (): JSX.Element => (
  <PublicRoute path={ROUTES.LOGIN} exact title="Login" component={LoginScreen} />
);
