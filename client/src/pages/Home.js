import React from "react";
//import styled from "styled-components";
// import { Modal } from "../components/Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../utils/actions";
import { Link } from 'react-router-dom';
import pupbangs from './assets/pupbangs.jpg'

const Home = () => {
  const [state, dispatch] = useStoreContext();
  const { showModal } = state;

  const open2Modal = () => {
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
  };

  return (
    <>
      <div className="container">
        <h3>We're ready to pamper your pup! </h3>
        <div className="flex-row">
          <div className="col-7">
        <p>
         Ruff Cuts is the top choice for your dog's grooming needs. We combine years of experience with loving care to keep your furry family members looking great and feeling even better.  
        </p>
        <p>We offer a wide variety of services. Check them out.</p>
        <button><Link to="/Services">Services</Link></button>

        <p>Meet our experienced team of groomers here.</p>
        <button><Link to="/About">Meet Us</Link></button>
        <p>Know what you want book here!</p>

          <button className="pill" onClick={open2Modal}>Book!</button>
        
        </div>
        <div className="col-5">
        <img width="200px" src={pupbangs} />
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;
