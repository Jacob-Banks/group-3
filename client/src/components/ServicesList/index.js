import React, { useState } from "react";
//import { Modal } from "../Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_SERVICES, UPDATE_SHOWMODAL } from "../../utils/actions";

const ServicesList = ({ options }) => {
  const [dog20lbOrless] = useState([
    {
      option: "Basic Package",
      service: "Cut and Wash",
      price: "20$",
    },
    {
      option: "Deluxe Package",
      service: "Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
      price: "50$",
    },
  ]);

  const [dogBetween20and60lb] = useState([
    {
      option: "Basic Package",
      service: "Cut and Wash",
      price: "30$",
    },
    {
      option: "Deluxe Package",
      service: "Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
      price: "60$",
    },
  ]);

  const [dog60lbOrPlus] = useState([
    {
      option: "Basic Package",
      service: "Cut and Wash",
      price: "40$",
    },
    {
      option: "Deluxe Package",
      service: "Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
      price: "70$",
    },
  ]);

  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const openModal = (e) => {
    const { param } = e.target.dataset;

    let person = dog20To60lb[param].service;

    dispatch({ type: UPDATE_SERVICES, services: person });
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });

    //console.log(state.groomer);
  };
  const dog20lb = dog20lbOrless.filter((opt) => opt.options === options);
  const dog20To60lb = dogBetween20and60lb.filter(
    (opt) => opt.options === options
  );
  const dog60andPlus = dog60lbOrPlus.filter((opt) => opt.options === options);
  return (
    <>
      <div>
        <ul>
          <h2>Small dogs 20lb</h2>
          {dog20lb.map((choice, i) => (
            <div>
              <h5 key={choice.option}>{choice.option}</h5>
              <li key={choice.service}>{choice.service}</li>
              <li key={choice.price}>{choice.price}</li>
              <button data-param={JSON.stringify(i)} onClick={openModal}>
                Click here to Book
              </button>
            </div>
          ))}

          <h2>Meduim Dogs 20lb to 60lb</h2>
          {dog20To60lb.map((choice, i) => (
            <div>
              <h5 key={choice.option}>{choice.option}</h5>
              <li key={choice.service}>{choice.service}</li>
              <li key={choice.price}>{choice.price}</li>
              <button data-param={JSON.stringify(i)} onClick={openModal}>
                Click here to Book
              </button>
            </div>
          ))}
          <h2>Big Dogs 60lb and plus</h2>
          {dog60andPlus.map((choice, i) => (
            <div>
              <h5 key={choice.option}>{choice.option}</h5>
              <li key={choice.service}>{choice.service}</li>
              <li key={choice.price}>{choice.price}</li>
              <button data-param={JSON.stringify(i)} onClick={openModal}>
                Click here to Book
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ServicesList;
