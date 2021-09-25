import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const userInputReducer = (state = initialState, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, isTouched: true };
  }
  return state;
};

const useInput = (validate) => {
  const [userInput, dispatch] = useReducer(userInputReducer, initialState);

  let isInputValid = validate(userInput.value);

  let hasError = !isInputValid && userInput.isTouched;

  const userInputChangeHandler = (e) => {
    dispatch({ type: "CHANGE", value: e.target.value });
  };

  const addInValidClasses = (input) => {
    return hasError ? "invalid" : (input.length > 0 && "valid").toString();
  };

  const displayErrorMessage = (errMsg) => {
    return hasError && errMsg;
  };

  return {
    value: userInput.value,
    onChangeHandler: userInputChangeHandler,
    isValid: isInputValid,
    addInValidClasses,
    displayErrorMessage,
  };
};

export default useInput;
