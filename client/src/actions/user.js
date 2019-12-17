import axios from "axios";
import setHeaders from "../helpers/setHeaders";
import {
  GET_USER,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  DELETE_USER
} from "./types";

// export const getUsers = () => {
//   return dispatch => {
//     axios
//       .get("/api/users")
//       .then(res => {
//         dispatch({
//           type: GET_USERS,
//           payload: res.data
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };

export const getCurrentUser = () => {
  return dispatch => {
    axios
      .get("api/users/")
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      })
      .catch(err => console.log(err.response));
  };
};

export const editUser = (data, history) => {
  return dispatch => {
    axios
      .put(`api/users/`, data)
      .then(res => {
        dispatch({
          type: GET_ERRORS,
          payload: {}
        });
        history.push("/profile");
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

export const deleteUser = history => {
  return dispatch => {
    localStorage.removeItem("token");
    axios
      .delete("api/users/")
      .then(res => {
        dispatch({ type: DELETE_USER });
        setHeaders({});
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const uploadAvatar = (formData, config) => {
  return dispatch => {
    axios
      .post("api/users/upload-avatar", formData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};
