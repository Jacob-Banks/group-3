import React from "react";
import { useQuery, useMutation} from "@apollo/client";
import { QUERY_APPOINTMENTS_USER } from "../../utils/queries";
import auth from "../../utils/auth";
import { CANCEL_APPOINTMENT } from "../../utils/mutations";

const ApptList = () => {
  let get = auth.getProfile();
  let user = get.data.username;
  console.log(user);

  const { loading, data } = useQuery(QUERY_APPOINTMENTS_USER, {
    variables: { username: user },
  });
  const userData = data || [];
  

  const appointments = userData.appointments;

  // console.log(appointments[0]._id);

  const [removeAppt, {error}] = useMutation(CANCEL_APPOINTMENT);

  

  const cancelAppointment = async (apptId) => {
    console.log(apptId)
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
    return false;
    } 
    try {
      const { loading, data } = await removeAppt({
        variables: { _id: apptId },
      });

      if (!loading) {
        console.log(data, 'this is the data')
      } else {
        console.log('not loading')
      }

      if (error) {
        throw new Error("something went wrong :(");
      }

      

    } catch (err) {
      console.error(err);
    } window.location.href="/profile";
  };



  if (!appointments) {
    return <h3>Nothing booked yet.</h3>;
  }



  return (
    <div>
      <h3>Here are your most recent bookings:</h3>
      {appointments &&
        appointments.map((appointment, i ) => (
          <div key={appointment._id} className="card mb-3">
            <p className="card-header">
              Scheduled for {appointment.day} at {appointment.time}:00
            </p>
            <div className="card-body">
              <p>
                You booked a {appointment.services} for your {appointment.size}{" "}
                sized dog, with {appointment.groomer}
              </p>
            </div>
            <div>
              <button onClick={() => cancelAppointment(appointments[i]._id)} 
              > Cancel
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ApptList;
