import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogOut } from "../../actions/auth";
import { eventLogout } from "../../actions/events";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(startLogOut());
    //dispatch(eventLogout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">{name}</a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
      <button className="btn btn-outline-danger" onClick={onLogOut}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </nav>
  );
};
