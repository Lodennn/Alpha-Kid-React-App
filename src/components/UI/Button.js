import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`${classes.Button} ${props.utility}`}
      onClick={props.onClick}
    >
      {props.icon} <p>{props.text}</p>
    </button>
  );
};

export default Button;
