import React, { useReducer, useContext } from "react";
import axios from "axios";

import {
  LOGIN_SUPERVISOR_BEGIN,
  LOGIN_SUPERVISOR_SUCCESS,
  LOGIN_SUPERVISOR_ERROR,
  LOGOUT_SUPERVISOR,
  LOGIN_STUDENT_BEGIN,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_ERROR,
} from "./actions";

import reducer from "./reducer";
import { errorToast, successToast } from "../components/toast";

const modules = localStorage.getItem("modules");
const token = localStorage.getItem("token");

const initialState = {
  //Login
  showAlert: false,
  alertText: "",
  alertType: "",
  modules: modules ? JSON.parse(modules) : null,
  token: token,
  isLoading: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios and add Access-Token to header

  const authFetch = axios.create({
    baseURL: "http://20.235.163.35:8080",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Access-Token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        logoutSupervisor();
        errorToast("Session expired, Refresh and login again");
      }
      return Promise.reject(error);
    }
  );

  const addTokenToLocalStorage = ({ modules, token }) => {
    localStorage.setItem("token", token);
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const loginSupervisor = async (logInData) => {
    dispatch({ type: LOGIN_SUPERVISOR_BEGIN });

    try {
      const { data } = await authFetch.post("/admin/login", logInData);

      if (data?.access_token) {
        dispatch({
          type: LOGIN_SUPERVISOR_SUCCESS,
          payload: {
            token: data.access_token,
          },
        });
        addTokenToLocalStorage({
          token: data.access_token,
        });
        successToast("Login successful");
      } else {
        errorToast("Login failed");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_SUPERVISOR_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
      if (
        error.response.data.status === "EMAIL_NOT_FOUND" ||
        error.response.data.status === "INCORRECT_PASSWORD"
      ) {
        errorToast("Invalid email or password");
      } else {
        errorToast("Login failed");
      }
    }
  };

  const loginStudent = async (logInData) => {
    dispatch({ type: LOGIN_STUDENT_BEGIN });

    try {
      const { data } = await authFetch.post("/student/exam-attendance-attendance/mark-exam-attendance", logInData);

      // TODO
      if (true) {
        dispatch({
          type: LOGIN_STUDENT_SUCCESS,
        });
        successToast("Login successful");
      } else {
        errorToast("Login failed");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_STUDENT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  }

  const logoutSupervisor = () => {
    dispatch({ type: LOGOUT_SUPERVISOR });
    removeTokenFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginSupervisor,
        logoutSupervisor,
        loginStudent,
        authFetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
