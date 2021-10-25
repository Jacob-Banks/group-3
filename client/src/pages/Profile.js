import React from "react";
import ApptList from "../components/ApptList";
import { useQuery } from "@apollo/client";
import { QUERY_APPOINTMENTS_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  let get = Auth.getProfile();
  let user = get.data.username;
  console.log(user);

  const { loading, data } = useQuery(QUERY_APPOINTMENTS_USER, {
    variables: { username: user },
  });
  const userData = data || [];
  // console.log(userData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1> My appointments </h1>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ApptList />
            </div>

            {/* conditionally render button on current bookings */}
            <div>
            {/* create mutation to delete appt */}
            <button>Cancel</button>
            </div>

  

        <div>
          <button>Click here to book an appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;