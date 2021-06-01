import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    // llamamos el custom fetch del helper
    const resp = await fetchWithOutToken("auth", { email, password }, "POST");

    const body = await resp.json();

    if (body.ok) {
      // Validamos que la respuestas sea correcta y grabamos en el localStorage
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.user._id,
          name: body.user.name,
        })
      );
    } else {
      Swal.fire("Error", body.error, "error");
      dispatch(checkingFinish());
    }
  };
};

const login = (user) => ({
  type: types.login,
  payload: user,
});

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

export const startLogOut = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(logOut());
  };
};

const logOut = () => ({
  type: types.logout,
});

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    // llamamos el custom fetch del helper
    const resp = await fetchWithOutToken(
      "auth/new",
      { name, email, password },
      "POST"
    );

    const body = await resp.json();

    if (body.ok) {
      // Validamos que la respuestas sea correcta y grabamos en el localStorage
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.error, "error");
      dispatch(checkingFinish());
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      // Validamos que la respuestas sea correcta y grabamos en el localStorage
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.error, "error");
      dispatch(checkingFinish());
    }
  };
};
