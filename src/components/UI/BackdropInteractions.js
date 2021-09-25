import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

const BackdropEl = (props) => {
  return <div className="backdrop--interactions" onClick={props.onClick}></div>;
};
const Backdrop = (props) => {
  const [showBackdrop, setShowBackdrop] = useState(props.status);

  const showBackdropHandler = (e) => {
    setShowBackdrop((state) => {
      props.hideBackdrop(!state);
      return !state;
    });
  };
  return (
    <Fragment>
      {showBackdrop &&
        ReactDOM.createPortal(
          <BackdropEl onClick={showBackdropHandler} />,
          document.getElementById("backdrop-interactions")
        )}
    </Fragment>
  );
};

export default Backdrop;
