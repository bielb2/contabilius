import { BrowserRouter, Switch } from 'react-router-dom';

import { PrivateStackNavigator, PublicStackNavigator } from './stack';

const NavigationStack = (): JSX.Element => (
  <>
    <PublicStackNavigator />
    <PrivateStackNavigator />
  </>
);

export const Navigation = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <NavigationStack />
    </Switch>
  </BrowserRouter>
);
