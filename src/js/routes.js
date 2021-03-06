import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Login from './containers/Login/LoginPage';
import UserPage from './containers/User/UserPage';
import NotFound from './containers/NotFoundPage';
import Dashboard from './containers/DashboardPage';
import DashboardHomePage from './containers/DashboardHomePage';

export const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.login.loggedIn) {
      // Not authenticated, redirect to login page.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/'
      });
    }
  };

  const sessionCheck = (nextState, replace) => {
    const state = store.getState();

    if (state.login.loggedIn) {
      // User already has a server validated session.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/dashboard'
      });
    }
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} onEnter={sessionCheck} />
        <Route path="/forgot-password/:guid" component={Login} />
      </Route>
      <Route path="/dashboard" component={Dashboard} onEnter={authRequired}>
        <IndexRoute component={DashboardHomePage} />
        <Route path="user" component={UserPage} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
};
