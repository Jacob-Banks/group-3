import React, { useState } from "react";

const ServicesList = ({ option }) => {

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

  const dog20lb = dog20lbOrless.filter((pack) => pack.option === option);

 return(
    <div>
        <div>
            {dog20lb.map()=>()}
        </div>
    </div>
 )
};
