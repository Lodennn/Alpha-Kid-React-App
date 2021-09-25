import classes from "./Alert.module.scss";

const Alert = (props) => {
  return (
    <div className={classes.alert}>
      <p className={classes["alert__txt"]}>
        {props.text}
        <span className={classes["alert__highlight"]}>{props.highlight}</span>
      </p>
    </div>
  );
};

export default Alert;
