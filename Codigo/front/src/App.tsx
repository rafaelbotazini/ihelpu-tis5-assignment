import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/Layout';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

import {
  CurrentUserContext,
  useCurrentUser,
} from './contexts/CurrentUserContext';
import { UserGroupsContextProvider } from './contexts/UserGroupsContext';

import './services/wsRequest';
import {
  ConnectionStatusContext,
  useConnectionStatus,
} from './contexts/ConnectionStatusContext';

const App: React.FC = () => {
  const currentUser = useCurrentUser();
  const connectionStatus = useConnectionStatus();

  return (
    <React.Fragment>
      <ConnectionStatusContext.Provider value={connectionStatus}>
        <CurrentUserContext.Provider value={currentUser}>
          <UserGroupsContextProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/app" />
                </Route>
                <Route exact path="/signin">
                  <SignIn />
                </Route>
                <Route exact path="/forgotpassword">
                  <ForgotPassword />
                </Route>
                <Route exact path="/signup">
                  <SignUp />
                </Route>
                <PrivateRoute path="/app">
                  <Layout>
                    <Switch>
                      <Route exact path="/app">
                        <Redirect to="/app/rooms" />
                      </Route>
                      <Route path="/app/rooms">
                        <Rooms />
                      </Route>
                      <Route path="/app/profile">
                        <Profile />
                      </Route>
                      <Route path="/app/*">404 Not found</Route>
                    </Switch>
                  </Layout>
                </PrivateRoute>
                <Route path="*">404 Not found</Route>
              </Switch>
            </BrowserRouter>
          </UserGroupsContextProvider>
        </CurrentUserContext.Provider>
      </ConnectionStatusContext.Provider>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
