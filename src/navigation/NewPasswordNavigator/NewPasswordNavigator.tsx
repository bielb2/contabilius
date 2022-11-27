import { ROUTES } from 'src/constants';
import { PublicRoute } from 'src/router/components';

import { NewPasswordScreen } from './screens';

export const NewPasswordNavigator = (): JSX.Element => (
  <PublicRoute path={ROUTES.NEW_PASSWORD} title="Criar nova senha" exact component={NewPasswordScreen} />
);
