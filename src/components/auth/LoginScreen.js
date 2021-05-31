import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const [formLoginValues, handleLoginInputChange, resetLogin] = useForm({
    emailLogin: "usuario1@test.com",
    passwordLogin: "123456",
  });

  const { emailLogin, passwordLogin } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange, resetRegister] =
    useForm({
      nameRegister: "usuariotest2",
      emailRegister: "usuario2@test.com",
      password1: "123456",
      password2: "123456",
    });

  const { nameRegister, emailRegister, password1, password2 } =
    formRegisterValues;

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(emailLogin, passwordLogin));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      Swal.fire("Error", "Passwords are not equal", "error");
      return;
    }

    dispatch(startRegister(nameRegister, emailRegister, password1));
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="emailLogin"
                onChange={handleLoginInputChange}
                value={emailLogin}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="passwordLogin"
                onChange={handleLoginInputChange}
                value={passwordLogin}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="nameRegister"
                onChange={handleRegisterInputChange}
                value={nameRegister}
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="emailRegister"
                onChange={handleRegisterInputChange}
                value={emailRegister}
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password1"
                onChange={handleRegisterInputChange}
                value={password1}
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={handleRegisterInputChange}
                value={password2}
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
