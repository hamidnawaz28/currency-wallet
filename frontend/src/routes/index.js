import React, { useState, useEffect } from "react";
import { Dashboard, AmountDetails } from "../pages";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ProtectedRoute from "./ProtectedRoute";
import UserManage from "../pages/auth";
const useStyles = makeStyles({
  menu: {
    listStyle: "none",
    display: "grid",
    backgroundColor: "#232f3e",
    color: "white",
    gridTemplateColumns: "auto auto auto auto",
    "& li": {
      textAlign: "center",
      padding: "10px",
      "& a": {
        color: "white",
      },
    },
  },
  error: {
    textAlign: "center",
  },
});

const Routes = () => {
  const { menu, error } = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUserName] = useState(false);
  let user = localStorage.getItem("digitalUser");
  user = JSON.parse(user);

  useEffect(() => {
    if (user.token) {
      setIsAuthenticated(true);
      setUserName(user.user.username);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logoutUser = () => {
    localStorage.setItem("digitalUser", "{}");
    setIsAuthenticated(false);
  };
  debugger;
  return (
    <Router>
      {isAuthenticated ? (
        <div>
          <ul className={menu}>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
            <li>
              <Link>User: {username}</Link>
            </li>
            <li>
              <Link onClick={() => logoutUser()}>Logout</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul className={menu}>
            <li>
              <Link to="/auth/sign-up">SignUp</Link>
            </li>
            <li>
              <Link to="/auth/sign-in">SignIn</Link>
            </li>
          </ul>
        </div>
      )}
      <Switch>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/wallet"
          component={AmountDetails}
        />
        <Route path="/auth/sign-in">
          <UserManage type="Login" setAuth={setIsAuthenticated} />
        </Route>
        <Route path="/auth/sign-up">
          <UserManage type="Signup" />
        </Route>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/auth/sign-in" />
            )
          }
        />
        <Route path="*" render={() => <h1 className={error}>404</h1>} />
      </Switch>
    </Router>
  );
};

export default Routes;
