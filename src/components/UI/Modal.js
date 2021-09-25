import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

const BackdropEl = (props) => {
  return <div className="backdrop--global" onClick={props.onHide}></div>;
};

const ModalOverlay = (props) => {
  return <div className={`${classes.modal}`}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropEl onHide={props.onHide} />,
        document.getElementById("backdrop-overlay")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal-overlay")
      )}
    </Fragment>
  );
};

export default Modal;
