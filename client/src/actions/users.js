import axios from "axios";

export const getUsers = () => {
  return dispatch => {
    axios.get("/api/users").then(res => {
      dispatch({
        type: "GET_USERS",
        payload: res.data
      });
    });
  };
};

export const getUserById = id => {
  return dispatch => {
    axios.get(`/api/users/${id}`).then(res => {
      dispatch({
        type: "GET_USER",
        payload: res.data
      });
    });
  };
};

export const editUser = (id, data, callback1, callback2) => {
  return dispatch => {
    axios
      .put(`/api/users/${id}`, data)
      .then(res => {
        callback1();
      })
      .catch(err => {
        callback2();
        if (err.response && err.response.data) {
          dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
          });
        }
      });
  };
};
