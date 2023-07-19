import React, { useReducer, useContext } from "react";
import axios from "axios";

import {
  LOGIN_SUPERVISOR_BEGIN,
  LOGIN_SUPERVISOR_SUCCESS,
  LOGIN_SUPERVISOR_ERROR,
  LOGOUT_SUPERVISOR,
} from "./actions";

import reducer from "./reducer";

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
      if (error.response && error.response.status === 401) {
        logoutSupervisor();
      }
      return Promise.reject(error);
    }
  );

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

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginSupervisor: loginSupervisor,
        logoutSupervisor: logoutSupervisor,
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
