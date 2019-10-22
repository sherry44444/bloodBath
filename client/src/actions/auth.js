import axios from "axios";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeaders";

export const createUser = (data, callback1, callback2) => {
  return dispatch => {
    axios
      .post("http://localhost:8888/api/users", data)
      .then(res => {
        dispatch({
          type: "GET_ERRORS",
          payload: {}
        });
        callback1();
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
          });
          callback2();
        }
      });
  };
};

export const login = (data, callback1, callback2) => {
  return dispatch => {
    axios
      .post("http://localhost:8888/api/users/login", data)
      .then(res => {
        // dispatch({
        //   type: "GET_ERRORS",
        //   payload: {}
        // });
        const { token } = res.data;
        console.log(res);
        // dua jwt len localstorage
        localStorage.setItem("token", token);

        // decode --> dispatch auth reducer
        const decoded = jwtDecode(token);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: decoded
        });

        // set params token header cua nhung request
        setHeaders({ token });
        callback1();
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
          });
          callback2();
        }
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setHeaders({});
  };
};

export const deleteUser = (data, callback) => {
  return dispatch => {
    localStorage.removeItem("token");
    axios
      .delete(`http://localhost:8888/api/users/${data}`)
      .then(res => {
        dispatch({
          type: "DELETE_USER"
        });
        setHeaders({});
        callback();
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const postDonation = (data, callback1) => {
  return dispatch => {
    axios
      .post("http://localhost:8888/api/donations", data)
      .then(res => {
        let arr = [res.data];

        dispatch({
          type: "POST_DONATIONS",
          payload: arr
        });
        callback1();
      })
      .catch(err => {
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        });
      });

    // callback2();
  };
};
