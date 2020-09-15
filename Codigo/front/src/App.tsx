import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './pages/PrivateRoute';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/app">
            <Switch>
              <Route exact path="/app">
                Home page
              </Route>
              <Route path="/app/*">404 Not found</Route>
            </Switch>
          </PrivateRoute>
          <Route path="*">404 Not found</Route>
        </Switch>
      </BrowserRouter>

      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
