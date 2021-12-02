import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { userLogin } from "../../lib/api";
import { snackbarActions } from "../../store/snackbar/snackbar-slice";
import { userLoginAction } from "../../store/users/user.slice";
import Form from "../UI/Form";
import Input from "../UI/Input";
import classes from "./Auth.module.scss";

const Login = () => {
  const flipAuthCardsForwards = function () {
    const loginForm = document.querySelector('form[data-form-type="login"]');
    const signupForm = document.querySelector('form[data-form-type="signup"]');
    loginForm.style.animation = `${classes.rotateLoginForm} 1.5s ease forwards`;
    signupForm.style.animation = `${classes.rotateSignupForm} 1.5s ease forwards`;
  };

  const { users } = useSelector((state) => state.user);

  const { sendHttpRequest: loginRequest } = useHttp(userLogin);

  const dispatch = useDispatch();

  const history = useHistory();

  const emailValidate = (value) => {
    return value.includes("@");
  };
  const passwordValidate = (value) => {
    return value.length > 6;
  };

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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (emailIsValid && passwordIsValid) {
      loginRequest({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      })
        .then((data) => {
          const userData = users.find((user) => {
            return user.user.email === data.email;
          });
          if (userData) {
            dispatch(userLoginAction(userData));
          } else {
            throw new Error("User not found!");
          }
        })
        .catch((err) => {
          dispatch(
            snackbarActions.showSnackBar({
              type: "error",
              message: err.message,
            })
          );
        })
        .finally((_) => history.push("/"));
    }
  };
  return (
    <Form onSubmit={formSubmitHandler} data-form-type="login">
      <h2 className="form-title">Login</h2>
      <div className="form-control">
        <span className="danger">
          {emailErrorMsg("Invalid Email Format - Must contain @")}
        </span>
        <Input
          input={{
            type: "email",
            name: "email",
            id: "login-email",
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
            id: "login-password",
            onChange: passwordChangeHandler,
            className: passwordInvalidClasses(passwordValue),
          }}
          label="Password"
        />
      </div>
      <div className="form__actions">
        <button type="submit" className="form-submit">
          Login
        </button>
        <button
          type="button"
          className="form-secondary-option"
          id="create-new-account"
          onClick={flipAuthCardsForwards}
        >
          Create new account ?
        </button>
      </div>
    </Form>
  );
};

export default Login;
