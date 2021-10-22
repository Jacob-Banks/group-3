import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_APPOINTMENT } from "../utils/mutations";
import { QUERY_APPOINTMENTS_DAY } from "../utils/queries";

const Appointment = () => {
  let hideTimes = { display: "block" };
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  const [allValues, setAllValues] = useState({
    size: "",
    time: "",
    services: "",
  });
  const [day, setDay] = useState("");
  const [groomer, setGroomer] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(allValues);

    try {
      // add  to database

      const size = allValues.size;
      const time = allValues.time;
      const services = allValues.services;
      await addAppointment({
        variables: { day, size, time, services, groomer },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const [addAppointment] = useMutation(ADD_APPOINTMENT);
  const { loading, data } = useQuery(QUERY_APPOINTMENTS_DAY, {
    variables: { day: day },
  });
  const time = data?.appointments || {};

  let avail = [];

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const aGroomer = (event) => {
    setGroomer(event.target.value);
    //refetch({ day: day });
  };
  const aDayChange = (event) => {
    setDay(event.target.value);
    //refetch({ day: day });
  };
  if (groomer === "ally") {
    avail = [
      { value: "9", name: "9am: with Ally", groomer: "ally" },
      { value: "10", name: "10am: with Ally", groomer: "ally" },
      { value: "11", name: "11am: with Ally", groomer: "ally" },
      { value: "12", name: "12pm: with Ally", groomer: "ally" },
      { value: "1", name: "1pm: with Ally", groomer: "ally" },
      { value: "2", name: "2pm: with Ally", groomer: "ally" },
      { value: "3", name: "3pm: with Ally", groomer: "ally" },
      { value: "4", name: "4pm: with Ally", groomer: "ally" },
      { value: "5", name: "5pm: with Ally", groomer: "ally" },
      { value: "6", name: "6pm: with Ally", groomer: "ally" },
    ];
  }
  if (groomer === "bob") {
    avail = [
      { value: "9", name: "9am: with bob", groomer: "bob" },
      { value: "10", name: "10am: with bob", groomer: "bob" },
      { value: "11", name: "11am: with bob", groomer: "bob" },
      { value: "12", name: "12pm: with bob", groomer: "bob" },
      { value: "1", name: "1pm: with bob", groomer: "bob" },
      { value: "2", name: "2pm: with bob", groomer: "bob" },
      { value: "3", name: "3pm: with bob", groomer: "bob" },
      { value: "4", name: "4pm: with bob", groomer: "bob" },
      { value: "5", name: "5pm: with bob", groomer: "bob" },
      { value: "6", name: "6pm: with bob", groomer: "bob" },
    ];
  }
  if (groomer === "any" || groomer === "") {
    avail = [
      { value: null, name: "select time" },
      { value: "9", name: "9am: with Bob", groomer: "bob" },
      { value: "10", name: "10am: with Bob", groomer: "bob" },
      { value: "11", name: "11am: with Bob", groomer: "bob" },
      { value: "12", name: "12pm: with Bob", groomer: "bob" },
      { value: "1", name: "1pm: with Bob", groomer: "bob" },
      { value: "2", name: "2pm: with Bob", groomer: "bob" },
      { value: "3", name: "3pm: with Bob", groomer: "bob" },
      { value: "4", name: "4pm: with Bob", groomer: "bob" },
      { value: "5", name: "5pm: with Bob", groomer: "bob" },
      { value: "6", name: "6pm: with Bob", groomer: "bob" },
      { value: "9", name: "9am: with Ally", groomer: "ally" },
      { value: "10", name: "10am: with Ally", groomer: "ally" },
      { value: "11", name: "11am: with Ally", groomer: "ally" },
      { value: "12", name: "12pm: with Ally", groomer: "ally" },
      { value: "1", name: "1pm: with Ally", groomer: "ally" },
      { value: "2", name: "2pm: with Ally", groomer: "ally" },
      { value: "3", name: "3pm: with Ally", groomer: "ally" },
      { value: "4", name: "4pm: with Ally", groomer: "ally" },
      { value: "5", name: "5pm: with Ally", groomer: "ally" },
      { value: "6", name: "6pm: with Ally", groomer: "ally" },
    ];
  }
  if (day !== "") {
    // console.log(time.length);
    for (let i = 0; i < time.length; i++) {
      let match = avail.map(function (e) {
        return [e.value, e.groomer];
      });
      if (time.length > 0) {
        for (let z = 0; z < match.length; z++) {
          // This if statement depends on the format of your array
          if (match[z][0] === time[i].time && match[z][1] === time[i].groomer) {
            console.log(avail[z]);
            avail.splice(z, 1);
          }
        }
      }
    }

    hideTimes = { display: "block" };
  }

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
          min={today}
          value={day}
          onChange={aDayChange}
        />
        <select className="" id="groomer" name="groomer" onChange={aGroomer}>
          <option value="null"> select groomer </option>
          <option value="ally">Ally</option>
          <option value="bob">bob</option>
          <option value="any">Any</option>
        </select>

        <select className="" id="size" name="size" onChange={changeHandler}>
          <option value="null"> select size </option>
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
          <option value="null"> select service </option>
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
        <select
          style={hideTimes}
          className=""
          id="time"
          name="time"
          onChange={changeHandler}
        >
          {avail.map((e, key) => {
            return (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            );
          })}
        </select>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      <p>{day}</p>
    </main>
  );
};

export default Appointment;
