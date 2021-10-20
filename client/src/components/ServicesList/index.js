import React, { useState } from "react";

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
  const dog20lb = dog20lbOrless.filter((opt) => opt.options === options);
  const dog20To60lb = dogBetween20and60lb.filter((opt) => opt.options === options);
  const dog60andPlus = dog60lbOrPlus.filter((opt) => opt.options === options);
 return(
    <div>
        <h3>Small dogs 20lb</h3>
        <ul>
        {dog20lb.map((choice, i) => (
            <li key={choice.service}>{choice.service}</li>
        ))};
        <h3>Meduim Dogs 20lb to 60lb</h3>
        {dog20To60lb.map((choice, i) =>(
            <li key={choice.service}>{choice.service}</li>
        ))};
        <h3>Big Dogs 60lb and plus</h3>
        {dog60andPlus.map((choice, i) =>(
            <li key={choice.service}>{choice.service}</li>
        ))};
         </ul>
        <li>Lo</li>
    </div>
 )
};
export default ServicesList;