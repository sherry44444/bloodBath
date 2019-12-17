import axios from "axios";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeaders";
import { GET_ERRORS, SET_CURRENT_USER, LOGOUT } from "./types";

export const createUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/users", userData)
      .then(res => {
        dispatch({
          type: GET_ERRORS,
          payload: {}
        });
        history.push("/");
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const login = data => {
  return dispatch => {
    axios
      .post("/api/users/login", data)
      .then(res => {
        const { token } = res.data;
        // dua jwt len localstorage
        localStorage.setItem("token", token);
        // decode --> dispatch auth reducer
        const decoded = jwtDecode(token);
        // set params token header cua nhung request
        setHeaders({ token });
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        });
        dispatch({
          type: GET_ERRORS,
          payload: {}
        });
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        }
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    setHeaders({});
  };
};
