import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    // Siempre se ejecuta una vez, esta funcion renueva el token cada vez que hace reload
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h1>Loading...</h1>;
  }

  // Para convertir un string en un valor booleno se le pone un signo de admiracion al frente
  // !'stringejemplo' -> false
  // !!'stringejemplo' -> true
  // !!null -> false

  return (
    <>
      <Router>
        <Switch>
          <PublicRoutes
            isLoggedIn={!!uid}
            exact
            path="/login"
            component={LoginScreen}
          />
          <PrivateRoutes
            isLoggedIn={!!uid}
            exact
            path="/"
            component={CalendarScreen}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};
