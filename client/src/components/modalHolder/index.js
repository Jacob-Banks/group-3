import React from "react";
import { Modal } from "../Modal/Modal";
//import { GlobalStyle } from "../globalStyles";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_SHOWMODAL } from "../../utils/actions";

const ModalApp = () => {
  const [state, dispatch] = useStoreContext();
  const { showModal } = state;
  return (
    <Modal
      showModal={showModal}
      dispatch={{ type: UPDATE_SHOWMODAL, showModal: { showModal } }}
    />
  );
};
export default ModalApp;
