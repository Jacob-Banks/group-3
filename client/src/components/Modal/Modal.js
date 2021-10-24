import React, { useRef, useEffect, useCallback } from "react";
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

  const changeDayHandler = (e) => {
    dispatch({ type: UPDATE_DAY, day: e.target.value });
  };
  const changeTimeHandler = (e) => {
    dispatch({ type: UPDATE_TIME, time: e.target.value });
    if (groomer === "Anyone") {
      let groomers = [];
      for (let i = 0; i < avilAppt.length; i++) {
        //console.log("looking for groomer");
        if (avilAppt[i].time === e.target.value) {
          console.log("found one");
          groomers.push(avilAppt[i].groomer);
        }
      }
      //console.log(groomers);
      if (groomers.indexOf(possibleGroomer[0]) === -1) {
        dispatch({ type: UPDATE_GROOMER, groomer: possibleGroomer[0] });
      }
      if (groomers.indexOf(possibleGroomer[1]) === -1) {
        dispatch({ type: UPDATE_GROOMER, groomer: possibleGroomer[1] });
      }
      if (groomers.indexOf(possibleGroomer[2]) === -1) {
        dispatch({ type: UPDATE_GROOMER, groomer: possibleGroomer[2] });
      }
      if (groomers.indexOf(possibleGroomer[3]) === -1) {
        dispatch({ type: UPDATE_GROOMER, groomer: possibleGroomer[3] });
      }
    }
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

  let possibleGroomer = ["ally", "bob", "cat", "dog"];
  let avail = [
    { value: null, name: `Book with ${groomer}` },
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

  if (groomer !== "Anyone") {
    for (let i = 0; i < avilAppt.length; i++) {
      for (let z = 0; z < avail.length; z++) {
        if (
          avail[z].value === avilAppt[i].time &&
          groomer === avilAppt[i].groomer
        ) {
          avail.splice(z, 1);
        }
      }
    }
  }
  if (groomer === "Anyone") {
    let a9 = 0;
    let a10 = 0;
    let a11 = 0;
    let p12 = 0;
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;
    let p5 = 0;
    let p6 = 0;
    for (let i = 0; i < avilAppt.length; i++) {
      console.log(avilAppt[i].time);
      switch (avilAppt[i].time) {
        case "9":
          a9++;
          // console.log("found");
          // console.log(a9);
          if (a9 >= possibleGroomer.length) {
            avail.splice(1, 1);
          }
          break;
        case "10":
          a10++;
          if (a10 >= possibleGroomer.length) {
            avail.splice(2, 1);
          }
          break;
        case "11":
          a11++;
          if (a11 >= possibleGroomer.length) {
            avail.splice(3, 1);
          }
          break;
        case "12":
          p12++;
          if (p12 >= possibleGroomer.length) {
            avail.splice(4, 1);
          }
          break;
        case "1":
          p1++;
          if (p1 >= possibleGroomer.length) {
            avail.splice(5, 1);
          }
          break;
        case "2":
          p2++;
          if (p2 >= possibleGroomer.length) {
            avail.splice(6, 1);
          }
          break;
        case "3":
          p3++;
          if (p3 >= possibleGroomer.length) {
            avail.splice(7, 1);
          }
          break;
        case "4":
          p4++;
          if (p4 >= possibleGroomer.length) {
            avail.splice(8, 1);
          }
          break;
        case "5":
          p5++;
          if (p5 >= possibleGroomer.length) {
            avail.splice(9, 1);
          }
          break;
        case "6":
          p6++;
          if (p6 >= possibleGroomer.length) {
            avail.splice(10, 1);
          }
          break;
        default:
          console.log("bad data");
      }
    }
    //console.log(a9);
  }
  //if a date has been selected, remove all that dates bookings  from the possible booking array.
  // time is the object of all bookings on selected day ie time[0].time would be the time of the first booking time.groomer would be the groomer
  // avail is the array of possible bookings times with each groomer
  //
  //   let match = avail.map(function (e) {
  //     return [e.value, e.groomer];
  //   });
  //   if (avilAppt.length > 0) {
  //
  //       }
  //     }
  //   }
  //}

  //hideTimes = { display: "block" };
  // }

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
                    value={groomer}
                    className=""
                    id="groomer"
                    name="groomer"
                    onChange={changeGroomerHandler}
                  >
                    <option value={groomer}> {groomer} </option>
                    <option value="Anyone">Anyone</option>
                    <option value="ally">Ally</option>
                    <option value="bob">bob</option>
                    <option value="cat">cat</option>
                    <option value="dog">dog</option>
                  </select>

                  <select
                    className=""
                    id="size"
                    name="size"
                    onChange={changeSizeHandler}
                  >
                    <option value={size}> {size} </option>
                    <option value="small">Small: Under 20lbs</option>
                    <option value="medium">Medium: Between 20 and 40lbs</option>
                    <option value="large">Large: Over 40lbs</option>
                  </select>
                  <select
                    className=""
                    id="services"
                    name="services"
                    value={services}
                    onChange={changeServicesHandler}
                  >
                    <option value={services}> {services} </option>
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
