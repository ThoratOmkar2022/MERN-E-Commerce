import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "gray",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "auto",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="d-flex flex-row justify-content-between p-3">
          <h2
          //  className="" style={{ marginLeft: "20%", marginTop: "15px" }}
          >
            My Order
          </h2>
          <button
            className="btn bg-danger fs-3"
            // style={{ marginLeft: "90%", marginTop: "15px" }}
            onClick={onClose}
          >
            X
          </button>
        </div>

        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
