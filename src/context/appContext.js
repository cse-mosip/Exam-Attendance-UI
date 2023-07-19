import React, { useReducer, useContext } from "react";
import axios from "axios";

import {
  LOGIN_SUPERVISOR_BEGIN,
  LOGIN_SUPERVISOR_SUCCESS,
  LOGIN_SUPERVISOR_ERROR,
  LOGOUT_SUPERVISOR,
  FETCH_EXAMS_SCHEDULE_BEGIN,
  FETCH_EXAMS_SCHEDULE_SUCCESS,
  FETCH_EXAMS_SCHEDULE_ERROR,
} from "./actions";

import reducer from "./reducer";

const modules = localStorage.getItem("modules");
const token = localStorage.getItem("token");

const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  modules: modules ? JSON.parse(modules) : null,
  token: token,
  isLoading: false,
  isLoadingExams: false,
  exams: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios and add Access-Token to header
  const dummyToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjg5NzQ2OTY4LCJleHAiOjE2ODk3NTA1NjgsIm5iZiI6MTY4OTc0Njk2NywidXNlcl90eXBlIjoiMSJ9.gKEW341go6tyOoYZj9AfJozICqWk3_cKpe1seQgd0Me5AboJ-wiDUtqyAYudtDfnPTpjV89nb9KUCfaLoYTa0Q";

  const authFetch = axios.create({
    baseURL: "http://20.235.163.35:8080",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization",
      "Access-Token": dummyToken,
    },
  });

  // request
  // authFetch.interceptors.request.use((config) => {
  //     config.headers.common['Authorization'] = `Bearer ${state.token}`
  //     return config
  // }, (error) => {
  //     return Promise.reject(error)
  // })

  // response
  // authFetch.interceptors.response.use((response) => {
  //     return response
  // }, (error) => {
  //     if (error.response.status === 401) {
  //         logoutUser()
  //     }
  //     return Promise.reject(error)
  // })

  const addModulesToLocalStorage = ({ modules, token }) => {
    localStorage.setItem("modules", JSON.stringify(modules));
    localStorage.setItem("token", token);
  };

  const removeModulesFromLocalStorage = () => {
    localStorage.removeItem("modules");
    localStorage.removeItem("token");
  };

  const loginSupervisor = async (logInData, withEmail = false) => {
    dispatch({ type: LOGIN_SUPERVISOR_BEGIN });

    try {
      const url = withEmail
        ? "/attendance/exams/verifyEmail/supervisor"
        : "/attendance/exams/verify/supervisor";
      const { data } = await axios.post(url, logInData);
      const { modules, token, verification_success } = data;
      if (verification_success) {
        dispatch({
          type: LOGIN_SUPERVISOR_SUCCESS,
          payload: {
            modules,
            token,
          },
        });
      }

      // local storage
      addModulesToLocalStorage({
        modules,
        token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_SUPERVISOR_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const logoutSupervisor = () => {
    dispatch({ type: LOGOUT_SUPERVISOR });
    removeModulesFromLocalStorage();
  };

  const fetchExamsSchedule = async () => {
    dispatch({ type: FETCH_EXAMS_SCHEDULE_BEGIN });

    try {
      const response = await authFetch.post("/admin/exam/all-exams", {});
      dispatch({
        type: FETCH_EXAMS_SCHEDULE_SUCCESS,
        payload: {
          exams: response.data.data,
        },
      });
    } catch (error) {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      dispatch({
        type: FETCH_EXAMS_SCHEDULE_ERROR,
        payload: {
          msg: errorMessage,
        },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginSupervisor: loginSupervisor,
        logoutSupervisor: logoutSupervisor,
        authFetch,
        fetchExamsSchedule,
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
