import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_APPOINTMENT } from "../utils/mutations";
//import { QUERY_APPOINTMENTS } from "../utils/queries";

const Appointment = () => {
  const [allValues, setAllValues] = useState({
    day: "",
    size: "",
    time: "",
    services: "",
  });

  const changeHandler = (e) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
    console.log(allValues);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(allValues);
    try {
      // add thought to database
      const day = allValues.day;
      const size = allValues.size;
      const time = allValues.time;
      const services = allValues.services;
      await addAppointment({
        variables: { day, size, time, services },
      });

      // clear form value
      setAllValues("");
    } catch (e) {
      console.error(e);
    }
  };
  const [addAppointment] = useMutation(ADD_APPOINTMENT);
  //, {
  //   update(cache, { data: { addAppointment } }) {
  //     try {
  //       // could potentially not exist yet, so wrap in a try...catch
  //       const { appointments } = cache.readQuery({ query: QUERY_APPOINTMENTS });
  //       cache.writeQuery({
  //         query: QUERY_APPOINTMENTS,
  //         data: { appointments: [addAppointment, ...appointments] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });

  return (
    <main>
      <h1>book apointment page</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="date"
          className=""
          id="day"
          name="day"
          onChange={changeHandler}
        />
        <select className="" id="time" name="time" onChange={changeHandler}>
          <option value="9">9am</option>
          <option value="10">10am</option>
          <option value="11">11am</option>
          <option value="12">12pm</option>
          <option value="13">1pm</option>
          <option value="14">2pm</option>
          <option value="15">3pm</option>
          <option value="16">4pm</option>
          <option value="17">5pm</option>
          <option value="18">6pm</option>
        </select>
        <select className="" id="size" name="size" onChange={changeHandler}>
          <option value="small">Small: Under 20lbs</option>
          <option value="medium">Medium: Between 20 and 40lbs</option>
          <option value="large">Large: Over 40lbs</option>
        </select>
        <select
          className=""
          id="services"
          name="services"
          onChange={changeHandler}
        >
          <option value="Cut and Wash">Cut and Wash</option>
          <option value="Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland">
            Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland
          </option>
          <option value="Cut">Cut</option>
          <option value="wash">Wash</option>
          <option value="nail">Nail cut</option>
          <option value="butt gland">Squeeze Butt Gland</option>
          <option value="brush Teath">Brush Teath</option>
        </select>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Appointment;
