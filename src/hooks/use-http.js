import { useCallback } from "react";
import { useReducer } from "react";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};
const httpReducer = (state = initialState, action) => {
  if (action.type === "REQUEST") {
    return { ...state, isLoading: true, error: null };
  }
  if (action.type === "SUCCESS") {
    return { ...state, data: action.data, isLoading: false };
  }
  if (action.type === "ERROR") {
    return { ...state, isLoading: false, error: action.error };
  }
  return state;
};

const useHttp = (requestData) => {
  const [httpData, dispatch] = useReducer(httpReducer, initialState);

  const sendHttpRequest = useCallback(
    async (queryData) => {
      dispatch({ type: "REQUEST" });
      try {
        const data = await requestData(queryData);
        dispatch({ type: "SUCCESS", data: data });
        return data;
      } catch (err) {
        dispatch({ type: "ERROR", error: err.msg });
        throw err;
      }
    },
    [requestData, dispatch]
  );

  return {
    sendHttpRequest,
    ...httpData,
  };
};

export default useHttp;
