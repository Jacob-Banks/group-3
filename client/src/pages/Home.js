import React from "react";
//import styled from "styled-components";
// import { Modal } from "../components/Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../utils/actions";


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
          <div className="col-6">
        <p>
         Ruff Cuts is the top choice for your dog's grooming needs. We combine years of experience with loving care to keep your furry family members looking great and feeling even better.  
        </p>
        <p>We offer a wide variety of services. Check them out.</p>
        <p>Meet our experienced team of groomers here.</p>
        <p>
          Know what you want book here!
          </p>
          <button className="pill" onClick={open2Modal}>Book!</button>
        
        </div>
        <div className="col-6">
        
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;
