import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../store";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { getUser } from "../services/auth.service";
import { signInSuccess } from "../store/ducks/auth/actions";
import { auth } from "../firebase";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ToDoList from "../pages/ToDoList";

interface AuthenticatedState {
  signed: boolean;
}

const Routes: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  async function getUserInfo(email: string) {
    const userInfo = await getUser(email);

    if (userInfo) {
      dispatch(signInSuccess(userInfo));
      setLoading(false);
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user && user.email) {
        getUserInfo(user.email);
      } else {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p style={{ color: "white" }}>Carregando</p>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <HomeRedirect exact path="/" />
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/cadastro">
          <SignUp />
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
