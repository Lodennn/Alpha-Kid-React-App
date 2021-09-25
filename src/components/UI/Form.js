import React from "react";

const Form = React.forwardRef((props, ref) => {
  return (
    <form className={`auth-form form`} {...props} ref={ref}>
      {props.children}
    </form>
  );
});

export default Form;
