import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return <div className={classes["lds-hourglass"]}></div>;
};

export default LoadingSpinner;
