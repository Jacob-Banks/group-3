import React from "react";
import ApptList from "../components/ApptList";
import { useQuery } from "@apollo/client";
import { QUERY_APPOINTMENTS_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../utils/actions";


const Profile = () => {
  let get = Auth.getProfile();
  let user = get.data.username;
  console.log(user);

  const { loading, data } = useQuery(QUERY_APPOINTMENTS_USER, {
    variables: { username: user },
  });
  const userData = data || [];
  // console.log(userData);

  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const openModal = (e) => {
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1> My Appointments </h1>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <div>
            <button onClick={openModal}>
              Click here to book an appointment
            </button>
          </div>
          <ApptList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
