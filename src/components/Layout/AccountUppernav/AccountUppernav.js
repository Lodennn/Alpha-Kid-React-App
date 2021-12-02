import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaBell, FaShoppingCart, FaUser, FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../../store/users/user.slice";
import UserLinks from "./UserLinks/UserLinks";
import Notifications from "./Notifications/Notifications";
import classes from "./AccountUppernav.module.scss";
import "../../../styles/Buttons.scss";
import { featureWillBeAdded } from "../../../helpers";

const AccountUppernav = (props) => {
  const { user } = useSelector((state) => state.user);
  const [showUserLinks, setShowUserLinks] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogoutHandler = () => {
    dispatch(userLogoutAction());
    history.push("/");
  };

  const showUserLinksHandler = () => {
    setShowUserLinks((state) => !state);
  };

  const hideBackdrop = (backdropStatus) => {
    setShowNotifications(backdropStatus);
  };

  const showNotificationHandler = (e) => {
    if (
      e.target.parentElement.classList.contains(`${classes["notifications"]}`)
    ) {
      setShowNotifications((state) => !state);
    }
  };

  return (
    <div className={classes["account-uppernav"]}>
      <ul className={classes["account-uppernav__list"]}>
        {/* Item */}
        {featureWillBeAdded && (
          <li className={classes["account-uppernav__item"]}>
            <span className={classes["account-uppernav__icon"]}>
              <FaShoppingCart />
            </span>
            <span className={classes["account-uppernav__text"]}>
              <Link to="/shop" className="color--white">
                Shop
              </Link>
            </span>
          </li>
        )}
        {/* Item */}
        {/* Item */}
        {featureWillBeAdded && (
          <li
            className={`${classes["account-uppernav__item"]} ${classes["notifications"]}`}
            onClick={showNotificationHandler}
          >
            <span className={classes["account-uppernav__icon"]}>
              <FaBell />
            </span>
            <span className={classes["account-uppernav__text"]}>
              Notifications
            </span>
            {showNotifications && (
              <Notifications
                status={showNotifications}
                hideBackdrop={hideBackdrop}
              />
            )}
            {/* <Notifications status={showNotifications} /> */}
          </li>
        )}
        {/* Item */}
        {/* Item */}
        <li
          className={`${classes["account-uppernav__item"]} ${classes["user-links"]}`}
          onClick={showUserLinksHandler}
        >
          <span className={classes["account-uppernav__icon"]}>
            <FaUser />
          </span>
          <span className={classes["account-uppernav__text"]}>{user.name}</span>
          <span className={`${classes["account-uppernav__icon"]} ml-xs`}>
            <FaChevronDown />
          </span>
          {showUserLinks && (
            <UserLinks onLogout={userLogoutHandler} status={showUserLinks} />
          )}
        </li>
        {/* Item */}
      </ul>
    </div>
  );
};

export default AccountUppernav;
