import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_APPOINTMENT } from "../utils/mutations";
import { QUERY_APPOINTMENTS_DAY } from "../utils/queries";

const Appointment = () => {
  const [allValues, setAllValues] = useState({
    day: "",
    size: "",
    time: "",
    services: "",
  });

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
  const { loading, data } = useQuery(QUERY_APPOINTMENTS_DAY, {
    variables: { day: "2021-10-22" },
  });
  const time = data?.appointments || {};
  const avail = [
    { value: null, name: "select time" },
    { value: "9", name: "9am" },
    { value: "10", name: "10am" },
    { value: "11", name: "11am" },
    { value: "12", name: "12pm" },
    { value: "1", name: "1pm" },
    { value: "2", name: "2pm" },
    { value: "3", name: "3pm" },
    { value: "4", name: "4pm" },
    { value: "5", name: "5pm" },
    { value: "6", name: "6pm" },
  ];
  for (let i = 0; i < time.length; i++) {
    let match = avail
      .map(function (e) {
        return e.value;
      })
      .indexOf(time[i].time);
    console.log(match);
    avail.splice(match, 1);
  }

  const changeHandler = (e) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
    console.log(allValues);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
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
          {avail.map((e, key) => {
            return (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            );
          })}
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
