import React, { useState } from "react";
//import { Modal } from "../Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_SERVICES, UPDATE_SHOWMODAL } from "../../utils/actions";

import pupbangs from '../assets/pupbangs.jpg'


import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const ServicesList = ({ options }) => {
  const [dog20lbOrless] = useState([
    {
      option: "Basic Package",
      service: "Cut and Wash",
      price: [" Small: 40$ ", " Medium: 50$ ", " Large: 60$ "],
    },
    {
      option: "Deluxe Package",
      service:
        "Cut, Wash, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
      price: ["Small: 60$ ", "Medium: 70$ ", "Large: 80$"],
    },
    {
      option: "Brush Teeth ",
      service: "Expert level care for you canines' chompers",
      price: "10$",
    },
    {
      option: "Nail Cut ",
      service: "Clip those talons! ",
      price: "10$",
    },
    {
      option:
        "Ear Cleaning ",

      service: "Avoid the risk of perforating the ear drum or causing trauma to the ear canal ",
      price: "10$",
    },
    {
      option: "Squeeze Butt Gland ",
      service: "we will express your pups glands, instant relief",
      price: "20$",
    },
  ]);

  // const [dogBetween20and60lb] = useState([
  //   {
  //     option: "Basic Package",
  //     service: "Cut and Wash",
  //     price: "30$",
  //   },
  //   {
  //     option: "Deluxe Package",
  //     service: "Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
  //     price: "60$",
  //   },
  // ]);

  // const [dog60lbOrPlus] = useState([
  //   {
  //     option: "Basic Package",
  //     service: "Cut and Wash",
  //     price: "40$",
  //   },
  //   {
  //     option: "Deluxe Package",
  //     service: "Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland",
  //     price: "70$",
  //   },
  // ]);
  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const openModal = (e) => {
    const { param } = e.target.dataset;

    let person = dog20lb[param].option;

    dispatch({ type: UPDATE_SERVICES, services: person });
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });

    //console.log(state.groomer);
  };
  const dog20lb = dog20lbOrless.filter((opt) => opt.options === options);
  console.log(dog20lb);
  // const dog20To60lb = dogBetween20and60lb.filter(
  //   (opt) => opt.options === options
  // );
  // const dog60andPlus = dog60lbOrPlus.filter((opt) => opt.options === options);
  return (
    <>
      <div className="services">
        <div className="flex-row">
          <div className="col-8">
        <ul>
          {/* //<h2>Small dogs 20lb</h2> */}
          {dog20lb.map((choice, i) => (
            <div>
              <h5 key={choice.option}>{choice.option}</h5>
              <li service={choice.service}>{choice.service}</li>
              <li price={choice.price}>{choice.price}</li>
              {loggedIn ? (
                <button
                  className="pill"
                  data-param={JSON.stringify(i)}
                  onClick={openModal}
                >
                  Click here to Book
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
              {/* */}
            </div>
          ))}
        </ul>
        </div>
        <div className="col-3">
          <img width="250px" src={pupbangs}/>
        </div>
        </div>
      </div>
    </>
  );
};
export default ServicesList;
