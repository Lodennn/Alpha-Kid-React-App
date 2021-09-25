import { Fragment } from "react";
import BackdropInteractions from "../../../UI/BackdropInteractions";
import classes from "../AccountUppernav.module.scss";

const Notifications = (props) => {
  return (
    <Fragment>
      <BackdropInteractions
        status={props.status}
        hideBackdrop={props.hideBackdrop}
      />
      <div
        className={`${classes["notifications__wrapper"]} color--grey-default`}
      >
        <h3 className={classes["notifications__header"]}>Notifications</h3>
        <ul className={classes["notifications__list"]}>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mohamed</strong> has joined Animals Names Workshop
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Mostafa</strong> has watched Apex Movies
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
          <li className={classes["notifications__item"]}>
            Your kid <strong>Youssef</strong> has played Puzzle Game
            <span className={classes["notifications__duration"]}>
              3 min ago
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Notifications;
