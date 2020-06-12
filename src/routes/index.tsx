import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";

import SignIn from "../pages/SignIn";
import ToDoList from "../pages/ToDoList";

interface AuthenticatedState {
  signed: boolean;
}

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <HomeRedirect exact path="/" />
        <Route exact path="/login">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/todos">
          <ToDoList />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { signed } = useSelector<ApplicationState, AuthenticatedState>(
    (state) => ({
      signed: state.auth.user !== null ? true : false,
    })
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const HomeRedirect: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { signed } = useSelector<ApplicationState, AuthenticatedState>(
    (state) => ({
      signed: state.auth.user ? true : false,
    })
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signed ? (
          <Redirect
            to={{
              pathname: "/todos",
              state: { from: location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Routes;
