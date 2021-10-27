import React from "react";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../utils/actions";

import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import wash from "../components/Modal/bath.jpg";

const Home = () => {
  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const loggedIn = Auth.loggedIn();
  const open2Modal = () => {
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
  };

  return (
    <>
      <div className="container">
        <h3>We're ready to pamper your pup! </h3>

        <div className="flex-row">

          <div className="col-2"></div>
          <div className="col-8">
            <div className="homimg">{/* <img src={wash} /> */}</div>
            <p>
              Ruff Cuts is the top choice for your dog's grooming needs. We
              combine years of experience with loving care to keep your furry
              family members looking great and feeling even better.
            </p>
            <p>We offer a wide variety of services. Check them out.</p>
            <button className="pill">
              <Link to="/Services">Services</Link>
            </button>

            <p>Meet our experienced team of groomers here.</p>
            <button className="pill">
              <Link to="/About">Meet Us</Link>
            </button>
            <p>Know what you want book here!</p>
            {loggedIn ? (
              <button className="pill" onClick={open2Modal}>
                Book!
              </button>
            ) : (
              <>
                <button className="pill">
                  <Link to="/login"> Login</Link>{" "}
                </button>{" "}
                <span>or </span>{" "}
                <button className="pill">
                  <Link to="/signup">Signup</Link> To Book
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
