import React, { Fragment } from "react";
import classes from "./Input.module.scss";

const Input = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input className={classes.input} {...props.input} ref={ref} />
    </Fragment>
  );
});

export default Input;
