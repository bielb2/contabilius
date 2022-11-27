import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

export type PublicRouteProps = {
  path: PublicPaths;
  exact: boolean;
  title?: string;
  component: React.ComponentType<RouteComponentProps>;
  layout?: React.ComponentType;
};

export type PrivateRouteProps = {
  path: PrivatePaths;
  exact: boolean;
  title?: string;
  component: React.ComponentType<RouteComponentProps>;
  layout?: React.ComponentType;
};
