import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_APPOINTMENTS_USER } from "../../utils/queries";
import auth from "../../utils/auth";

const ApptList = () => {

  let get = auth.getProfile();
  let user = get.data.username;
  console.log(user);

  const { loading, data } = useQuery(QUERY_APPOINTMENTS_USER, {
    variables: { username: user },
  });
  const userData = data || [];
  console.log(userData);

  const appointments = userData.appointments

  if(!appointments) {
    return <h3>Nothing booked yet.</h3>
  }

    return (
        <div>
        <br />
        {appointments &&
          appointments.map(appointment => (
            <div key={appointment._id} className="card mb-3">
              <p className="card-header">
                Scheduled for {appointment.day} at {appointment.time}:00
              </p>
              <div className="card-body">
                <p>
                You booked a {appointment.services} for your {appointment.size} sized dog, with {appointment.groomer}
                </p>
              </div>
            </div>
          ))}
      </div>
    )
}


export default ApptList;