import React from "react";

import { Link } from "react-router-dom";
import { UPDATE_SHOWMODAL } from "../../utils/actions";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
//import { Modal } from "../Modal/Modal";
import logo from "../assets/logo.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [state, dispatch] = useStoreContext();

  const { showModal } = state;
  const openModal = () => {
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
  };
  return (
    <header
      id="header"
      className="bg-secondary mb-4 py-1 flex-row align-center"
    >
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img width="220px" src={logo} />
        </Link>

        <nav className="text-center">
          <Link to="/services">Services</Link>

          <Link to="/about">Groomers</Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="#header" onClick={openModal}>
                Book
              </Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
