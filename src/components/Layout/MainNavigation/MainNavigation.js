import classes from "./MainNavigation.module.scss";
import "../../../styles/Buttons.scss";
import { FaGamepad, FaPlay, FaHome } from "react-icons/fa";
import Logo from "../../UI/Logo";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const MainNavigation = (props) => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  return (
    <nav className={`${classes.nav} container-fluid`}>
      <Logo value="8" />
      <ul className={`${classes["nav__list"]} list-unstyled flex-list`}>
        <li className={classes["nav__item"]}>
          <Link
            to="/workshops"
            className={`${classes["nav__link"]} btn btn--rounded btn-nav--primary`}
          >
            <FaHome
              className={`${classes["nav__icon"]} ${classes["nav__icon--1"]}`}
            />
            Workshops
          </Link>
        </li>
        {isLoggedIn && user.type !== "Teacher" && (
          <Fragment>
            <li className={classes["nav__item"]}>
              <Link
                to="/games"
                className={`${classes["nav__link"]} btn btn--rounded btn-nav--secondary`}
              >
                <FaGamepad
                  className={`${classes["nav__icon"]} ${classes["nav__icon--2"]}`}
                />
                Games
              </Link>
            </li>
            <li className={classes["nav__item"]}>
              <Link
                to="/videos"
                className={`${classes["nav__link"]} btn btn--rounded btn-nav--tertiary`}
              >
                <FaPlay
                  className={`${classes["nav__icon"]} ${classes["nav__icon--3"]}`}
                />
                Videos
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
