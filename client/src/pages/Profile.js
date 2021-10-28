import React from "react";
import ApptList from "../components/ApptList";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../utils/actions";

const Profile = () => {
  let get = Auth.getProfile();
  let user = get.data.username;
  // console.log(user);

  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  const openModal = (e) => {
    dispatch({ type: UPDATE_SHOWMODAL, showModal: !showModal });
  };

  return (
    <div>
      <div>
        <h1> {user}'s profile </h1>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-8 mb-3 col-lg-8">
          <div className="appointments">
            <button className="pill" onClick={openModal}>
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
