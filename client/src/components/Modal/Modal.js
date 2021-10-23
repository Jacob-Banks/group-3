import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_APPOINTMENT } from "../../utils/mutations";
import { QUERY_APPOINTMENTS_DAY } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_DAY,
  UPDATE_GROOMER,
  UPDATE_SERVICES,
  UPDATE_SIZE,
  UPDATE_TIME,
} from "../../utils/actions";
const Background = styled.div`
  width: 100%;
  height: 90%;
  max-width: 1200px;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

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
  const [state, dispatch] = useStoreContext();

  const { day, size, time, services, groomer } = state;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add  to database

      await addAppointment({
        variables: { day, size, time, services, groomer },
      });
    } catch (e) {
      console.error(e);
    }
    setShowModal((prev) => !prev);
  };

  const [addAppointment] = useMutation(ADD_APPOINTMENT);
  const { loading, data } = useQuery(QUERY_APPOINTMENTS_DAY, {
    variables: { day: day },
  });
  const avilAppt = data?.appointments || {};

  let avail = [];

  const changeDayHandler = (e) => {
    dispatch({ type: UPDATE_DAY, day: e.target.value });
  };
  const changeTimeHandler = (e) => {
    dispatch({ type: UPDATE_TIME, time: e.target.value });
  };
  const changeSizeHandler = (e) => {
    dispatch({ type: UPDATE_SIZE, size: e.target.value });
  };
  const changeServicesHandler = (e) => {
    dispatch({ type: UPDATE_SERVICES, services: e.target.value });
  };
  const changeGroomerHandler = (e) => {
    dispatch({ type: UPDATE_GROOMER, groomer: e.target.value });
  };

  if (groomer === "ally") {
    avail = [
      { value: "", name: "book with Ally!", groomer: "ally" },
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
      { value: "", name: "book with bob!", groomer: "bob" },
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
    ];
  }
  if (day !== "") {
    //if a date has been selected, remove all that dates bookings  from the possible booking array.
    // time is the object of all bookings on selected day ie time[0].time would be the time of the first booking time.groomer would be the groomer
    // avail is the array of possible bookings times with each groomer
    for (let i = 0; i < avilAppt.length; i++) {
      let match = avail.map(function (e) {
        return [e.value, e.groomer];
      });
      if (avilAppt.length > 0) {
        for (let z = 0; z < match.length; z++) {
          if (
            match[z][0] === avilAppt[i].time &&
            match[z][1] === avilAppt[i].groomer
          ) {
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
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="date"
                    className=""
                    id="day"
                    name="day"
                    min={today}
                    value={day}
                    onChange={changeDayHandler}
                  />
                  <select
                    className=""
                    id="groomer"
                    name="groomer"
                    onChange={changeGroomerHandler}
                  >
                    <option value="null"> select groomer </option>
                    <option value="ally">Ally</option>
                    <option value="bob">bob</option>
                    <option value="any">Any</option>
                  </select>

                  <select
                    className=""
                    id="size"
                    name="size"
                    onChange={changeSizeHandler}
                  >
                    <option value="null"> select size </option>
                    <option value="small">Small: Under 20lbs</option>
                    <option value="medium">Medium: Between 20 and 40lbs</option>
                    <option value="large">Large: Over 40lbs</option>
                  </select>
                  <select
                    className=""
                    id="services"
                    name="services"
                    onChange={changeServicesHandler}
                  >
                    <option value="null"> select service </option>
                    <option value="Cut and Wash">Cut and Wash</option>
                    <option value="Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland">
                      Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt
                      Gland
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
                    onChange={changeTimeHandler}
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
                </form>{" "}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
