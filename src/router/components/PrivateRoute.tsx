import React from 'react';

import { observer, Observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

import { useStores } from 'src/store';

import { Page } from './Page';
import { PrivateRouteProps } from './Route.props';

export const PrivateRoute = observer((props: PrivateRouteProps): JSX.Element => {
  const { path, exact, title, component: Component, layout: Layout } = props;

  const store = useStores();

  const CustomLayout = Layout || React.Fragment;

  return (
    <Route
      path={path}
      exact={exact}
      render={(renderProps) => (
        <Observer>
          {() =>
            store.authStore.userStatus === 'authenticated' ? (
              <>
                <CustomLayout />
                <Page title={title}>
                  <Component {...renderProps} />
                </Page>
              </>
            ) : (
              <Redirect from="/*" to="/login" />
            )
          }
        </Observer>
      )}
    />
  );
});
