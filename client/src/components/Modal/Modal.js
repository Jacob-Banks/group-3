import React, { useRef } from "react";
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
  UPDATE_SHOWMODAL,
  UPDATE_TIME,
} from "../../utils/actions";

const Background = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  max-height: calc(100vh - 100px);

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
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

export const Modal = () => {
  const [state, dispatch] = useStoreContext();

  const { day, size, time, services, groomer, showModal } = state;

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
      dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
    }
    console.log("close?");
  };

  // let hideTimes = { display: "block" };
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
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
    window.location.href = "/profile";
  };

  const [addAppointment] = useMutation(ADD_APPOINTMENT);
  const { loading, data } = useQuery(QUERY_APPOINTMENTS_DAY, {
    variables: { day: day },
  });
  const avilAppt = data?.appointments || {};
  // console.log(avilAppt);

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

  let possibleGroomer = [
    "Jason Terry",
    "Elizabeth Santon",
    "Viviane Curry",
    "Marie France",
  ];
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
      // console.log(avilAppt[i].time);
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
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              {/* //       <ModalContent> */}
              <div className="col-12 col-md-6">
                <div className="card">
                  <h4 className="card-header">Book!</h4>
                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                      <label className="form-label">
                        {" "}
                        Date
                        <input
                          type="date"
                          className=" form-input"
                          id="day"
                          name="day"
                          value={day}
                          min={today}
                          //   value={day}
                          onChange={changeDayHandler}
                        />
                      </label>
                      <label className="form-label">
                        {" "}
                        Groomer
                        <select
                          value={groomer}
                          className="form-input"
                          id="groomer"
                          name="groomer"
                          onChange={changeGroomerHandler}
                        >
                          <option value="Anyone">Anyone</option>
                          <option value="Marie France">Marie France</option>
                          <option value="Viviane Curry">Viviane Curry</option>
                          <option value="Elizabeth Santon">
                            Elizabeth Santon
                          </option>
                          <option value="Jason Terry">Jason Terry</option>
                        </select>
                      </label>
                      <label className="form-label">
                        {" "}
                        Size
                        <select
                          className="form-input"
                          id="size"
                          name="size"
                          value={size}
                          onChange={changeSizeHandler}
                        >
                          <option value="null">Slect size</option>
                          <option value="small">Small: Under 20lbs</option>
                          <option value="medium">
                            Medium: Between 20 and 40lbs
                          </option>
                          <option value="large">Large: Over 40lbs</option>
                        </select>
                      </label>
                      <label className="form-label">
                        {" "}
                        Services
                        <select
                          className="form-input"
                          id="services"
                          name="services"
                          value={services}
                          onChange={changeServicesHandler}
                        >
                          <option value={services}>{services}</option>
                          <option value="Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze Butt Gland">
                            Cut, Brush Teeth, Nail cut, Ear Cleaning, Squeeze
                            Butt Gland
                          </option>
                          <option value="Cut">Cut</option>
                          <option value="Cut and Wash">Cut and Wash</option>
                          <option value="wash">Wash</option>
                          <option value="nail">Nail cut</option>
                          <option value="butt gland">Squeeze Butt Gland</option>
                          <option value="brush Teath">Brush Teath</option>
                        </select>
                      </label>
                      <label className="form-label">
                        {" "}
                        Time{" "}
                        <select
                          className="form-input"
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
                      </label>

                      <button className="btn col-12 col-md-3" type="submit">
                        Submit
                      </button>
                    </form>{" "}
                  </div>
                </div>
              </div>
              {/* </ModalContent> */}
              <CloseModalButton
                aria-label="Close modal"
                onClick={() =>
                  dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal })
                }
                ref={modalRef}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
