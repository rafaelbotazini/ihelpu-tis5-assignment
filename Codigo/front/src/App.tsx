import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/Layout';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

import { UserGroupsProvider } from './contexts/UserGroupsContext';

import './services/wsRequest';
import {
  ConnectionStatusContext,
  useConnectionStatus,
} from './contexts/ConnectionStatusContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

const App: React.FC = () => {
  const connectionStatus = useConnectionStatus();

  return (
    <React.Fragment>
      <ConnectionStatusContext.Provider value={connectionStatus}>
        <AuthProvider>
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
                <UserGroupsProvider>
                  <ChatProvider>
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
                  </ChatProvider>
                </UserGroupsProvider>
              </PrivateRoute>
              <Route path="*">404 Not found</Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ConnectionStatusContext.Provider>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
