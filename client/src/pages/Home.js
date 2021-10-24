import React, { useState } from "react";
//import styled from "styled-components";
import { Modal } from "../components/Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_GROOMER } from "../utils/actions";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useStoreContext();

  const openModal = () => {
    dispatch({ type: UPDATE_GROOMER, groomer: "ally" });
    setShowModal((prev) => !prev);
  };
  const open2Modal = () => {
    // dispatch({ type: UPDATE_GROOMER, groomer: "ally" });
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className="container-fluid ">
        <Modal showModal={showModal} setShowModal={setShowModal} />

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
          <button onClick={openModal}>Book with ally!</button>
          <button onClick={open2Modal}>Book!</button>
        </p>
      </div>
    </>
  );
};

export default Home;
