import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../store/snackbar/snackbar-slice";

const MiddlewareRoute = (props) => {
  const dispatch = useDispatch();

  const { message } = props;

  useEffect(() => {
    dispatch(
      snackbarActions.showSnackBar({
        type: "error",
        message: message,
      })
    );
  }, [dispatch, message]);
  return <></>;
};

export default MiddlewareRoute;
