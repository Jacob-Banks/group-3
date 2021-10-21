import React, { useState } from "react";
//import styled from "styled-components";
import { Modal } from "../components/Modal/Modal";
//import { GlobalStyle } from "../globalStyles";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <h1>Landing page </h1>
      <Modal showModal={showModal} setShowModal={setShowModal} />
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
        Know what you want book here!<button onClick={openModal}>Book!</button>
      </p>
    </>
  );
};

export default Home;
