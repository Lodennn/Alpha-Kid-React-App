import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackdropInteractions from "../../../UI/BackdropInteractions";
import classes from "../AccountUppernav.module.scss";

const UserLinks = (props) => {
  const { user } = useSelector((state) => state.user);
  const userProfilePath = `/profile/${user.type.toLowerCase()}`;
  return (
    <Fragment>
      <BackdropInteractions status={props.status} />
      <ul className={classes["user-links__list"]}>
        <li className={classes["user-links__item"]}>
          <Link to={userProfilePath} className="color--grey-default">
            Profile
          </Link>
        </li>
        <li className={classes["user-links__item"]} onClick={props.onLogout}>
          <Link to="/" className="color--grey-default">
            Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default UserLinks;
