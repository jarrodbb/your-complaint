import "./donate.css";

import React, { useState } from "react";
import { Modal } from "@mui/material";
import Checkout from "../payment/checkoutpage/checkout";

const Donate = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <section id='donate'>
      <h1>Donate</h1>
      <div className="text-box">
        <p>Our CEOs need more money for a bigger boat. Please donate?</p>
        <p onClick={handleOpenModal} style={{ color: "blue", cursor: "pointer" }}>
          Click here to donate your life savings
        </p>
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Checkout />
        </div>
      </Modal>
    </section>
  );
};

export default Donate;
