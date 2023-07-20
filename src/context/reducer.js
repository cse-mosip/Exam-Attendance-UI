import {
  LOGIN_SUPERVISOR_BEGIN,
  LOGIN_SUPERVISOR_SUCCESS,
  LOGIN_SUPERVISOR_ERROR,
  LOGOUT_SUPERVISOR,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === LOGIN_SUPERVISOR_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_SUPERVISOR_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      module: action.payload.module,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
      isLoading: false,
    };
  }

  if (action.type === LOGIN_SUPERVISOR_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isLoading: false,
    };
  }

  if (action.type === LOGOUT_SUPERVISOR) {
    return initialState;
  }

  throw new Error(`no such action :${action.type}`);
};

export default reducer;
