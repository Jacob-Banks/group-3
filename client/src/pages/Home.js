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
      <div className="container-fluid ">
        <h3>We're ready to pamper your pup! </h3>
        <div className="flex-row">
          <div className="col-6">
        <p>
         Ruff Cuts is the top choice for your dog's grooming needs. We combine years of experience with loving care to keep your furry family members looking great and feeling even better.  
        </p>
        <p>check out services! add link</p>
        <p>meet us! add link</p>
        <p>find us! add link</p>

        <p>
          Know what you want book here!
          <button onClick={open2Modal}>Book!</button>
        </p>
        </div>
        <div className="col-6">
        <img src="pupbangs.jpg"/>
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;
