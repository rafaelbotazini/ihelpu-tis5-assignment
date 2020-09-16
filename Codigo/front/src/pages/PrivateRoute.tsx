import React, { ReactNode } from 'react';
import { isAuthenticated } from '../services/auth';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { children, ...rest } = props;

  const render = ({ location }: RouteProps): ReactNode =>
    isAuthenticated() ? (
      children
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: location } }} />
    );

  return <Route render={render} {...rest} />;
};
export default PrivateRoute;
