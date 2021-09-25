import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import classes from "./Uppernav.module.scss";
import "../../../styles/Buttons.scss";

const Uppernav = () => {
  return (
    <div className={classes.uppernav}>
      <div
        className={`${classes["uppernav__style"]} ${classes["uppernav__style--1"]}`}
      ></div>
      <div
        className={`${classes["uppernav__style"]} ${classes["uppernav__style--2"]}`}
      ></div>
      <div
        className={`${classes["uppernav__style"]} ${classes["uppernav__style--3"]}`}
      >
        <Link to="/login" className="btn btn-login">
          <FaUserAlt /> Login
        </Link>
      </div>
    </div>
  );
};

export default Uppernav;
