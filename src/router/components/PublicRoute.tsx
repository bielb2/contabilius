import React from 'react';

import { observer, Observer } from 'mobx-react';
import { Redirect, Route } from 'react-router-dom';

import { useStores } from 'src/store';

import { Page } from './Page';
import { PublicRouteProps } from './Route.props';

export const PublicRoute = observer((props: PublicRouteProps) => {
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
              <Redirect from="/*" to="/" />
            ) : (
              <>
                <CustomLayout />
                <Page title={title}>
                  <Component {...renderProps} />
                </Page>
              </>
            )
          }
        </Observer>
      )}
    />
  );
});
