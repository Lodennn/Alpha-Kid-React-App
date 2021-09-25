import { Fragment } from "react";
import Logo from "../UI/Logo";
import Login from "./Login";
import classes from "./Auth.module.scss";
import Signup from "./Signup";

const Auth = () => {
  return (
    <Fragment>
      <div className={classes["auth-logo"]}>
        <Logo value={8} />
      </div>
      <div className={classes.auth}>
        <div className={classes["auth__wrapper"]}>
          <Login />
          <Signup />
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
