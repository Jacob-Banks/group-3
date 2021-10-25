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
        <h1>Landing page </h1>

        <p>
          blah dkafljk dsaflkdfja adfslkjfak adflksjfa adskljfdka dafskalnf blah
          dkafljk dsaflkdfja adfslkjfak adflksjfa adskljfdka dafskalnf blah
          dkafljk dsaflkdfja adfslkjfak adflksjfa adskljfdka dafskalnf blah
          dkafljk dsaflkdfja adfslkjfak adflksjfa adskljfdka dafskalnf
        </p>
        <p>check out services! add link</p>
        <p>meet us! add link</p>
        <p>find us! add link</p>

        <p>
          Know what you want book here!
          <button onClick={open2Modal}>Book!</button>
        </p>
      </div>
    </>
  );
};

export default Home;
