import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";

const setAlert =
  (
    msg,
    alertType,
    timeout = 2000 // providing default timeout in sec
  ) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id, timeout },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export { setAlert };
