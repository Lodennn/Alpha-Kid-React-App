import React from "react";
import Form from "../UI/Form";
import Input from "../UI/Input";
import classes from "./Auth.module.scss";
import useInput from "../../hooks/use-input";
import { useDispatch } from "react-redux";
import { insertUserData } from "../../store/users/user.slice";
import useHttp from "../../hooks/use-http";
import { userSignup } from "../../lib/api";
import { useHistory } from "react-router";

const Signup = (props) => {
  // userSignup - Firebase Authentication NOT DB Itself
  const { sendHttpRequest: singupRequest } = useHttp(userSignup);

  const history = useHistory();

  const dispatch = useDispatch();

  const flipAuthCardsBackwards = function () {
    const loginForm = document.querySelector('form[data-form-type="login"]');
    const signupForm = document.querySelector('form[data-form-type="signup"]');
    loginForm.style.animation = `${classes.rotateLoginFormReversed} 1.5s ease forwards`;
    signupForm.style.animation = `${classes.rotateSignupFormReversed} 1.5s ease forwards`;
  };

  const userNameValidate = (value) => {
    return value.length > 6;
  };
  const emailValidate = (value) => {
    return value.includes("@");
  };
  const passwordValidate = (value) => {
    return value.length > 6;
  };
  const userTypeValidate = (value) => {
    return value.length !== "";
  };
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    onChangeHandler: userNameChangeHandler,
    addInValidClasses: usernameInvalidClasses,
    displayErrorMessage: usernameErrorMsg,
  } = useInput(userNameValidate);

  const {
    value: emailValue,
    isValid: emailIsValid,
    onChangeHandler: emailChangeHandler,
    addInValidClasses: emailInvalidClasses,
    displayErrorMessage: emailErrorMsg,
  } = useInput(emailValidate);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    onChangeHandler: passwordChangeHandler,
    addInValidClasses: passwordInvalidClasses,
    displayErrorMessage: passwordErrorMsg,
  } = useInput(passwordValidate);

  // Re-Password Validation
  const rePasswordValidate = (value) => {
    return value.length > 6 && passwordValue === value;
  };

  const {
    value: rePasswordValue,
    isValid: rePasswordIsValid,
    onChangeHandler: rePasswordChangeHandler,
    addInValidClasses: rePasswordInvalidClasses,
    displayErrorMessage: rePasswordErrorMsg,
  } = useInput(rePasswordValidate);

  const {
    value: userTypeValue,
    isValid: userTypeIsValid,
    onChangeHandler: userTypeChangeHandler,
  } = useInput(userTypeValidate);

  let isFormValid = false;
  if (
    usernameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    rePasswordIsValid &&
    userTypeIsValid
  ) {
    isFormValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const userType =
        userTypeValue === "" || userTypeValue === "Parent"
          ? "Parent"
          : "Teacher";

      const userData = {
        name: usernameValue,
        email: emailValue,
        password: passwordValue,
        type: userType,
      };

      singupRequest({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      })
        .then((data) => {
          dispatch(insertUserData({ user: userData, idToken: data.idToken }));
        })
        .then((_) => {
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };
  return (
    <Form onSubmit={formSubmitHandler} data-form-type="signup">
      <h2 className="form-title">Signup</h2>
      <div className="form-control">
        <span className="danger">
          {usernameErrorMsg("Username must be more than 6 characters")}
        </span>
        <Input
          input={{
            type: "username",
            name: "username",
            id: "username",
            onChange: userNameChangeHandler,
            className: usernameInvalidClasses(usernameValue),
          }}
          label="Username"
        />
      </div>
      <div className="form-control">
        <span className="danger">
          {emailErrorMsg("Invalid Email Format - Must contain @")}
        </span>
        <Input
          input={{
            type: "email",
            name: "email",
            id: "signup-email",
            onChange: emailChangeHandler,
            className: emailInvalidClasses(emailValue),
          }}
          label="Email Address"
        />
      </div>
      <div className="form-control">
        <span className="danger">
          {passwordErrorMsg("Password must be more than 6 characters")}
        </span>
        <Input
          input={{
            type: "password",
            name: "password",
            id: "signup-password",
            onChange: passwordChangeHandler,
            className: passwordInvalidClasses(passwordValue),
          }}
          label="Password"
        />
      </div>
      <div className="form-control">
        <span className="danger">
          {rePasswordErrorMsg("Password doesn't Match")}
        </span>
        <Input
          input={{
            type: "password",
            name: "re-password",
            id: "re-password",
            onChange: rePasswordChangeHandler,
            className: rePasswordInvalidClasses(rePasswordValue),
          }}
          label="Re-Password"
        />
      </div>
      <div className="form-control">
        <label htmlFor="user-type">User Type</label>
        <select onChange={userTypeChangeHandler}>
          <option>Parent</option>
          <option>Teacher</option>
        </select>
      </div>
      <div className="form__actions">
        <button type="submit" className="form-submit">
          Signup
        </button>
        <button
          type="button"
          className="form-secondary-option"
          id="have-account"
          onClick={flipAuthCardsBackwards}
        >
          Already have an account ?
        </button>
      </div>
    </Form>
  );
};

export default Signup;
