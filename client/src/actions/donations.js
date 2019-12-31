import axios from "axios";
import {
  GET_ERRORS,
  POST_DONATION,
  GET_DONATIONS,
  DONATION_TO_TICKET
} from "./types";

export const postDonation = (data, showModal) => {
  return dispatch => {
    axios
      .post("http://localhost:8888/api/donations", data)
      .then(res => {
        dispatch({
          type: POST_DONATION,
          payload: res.data
        });
        showModal();
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const getDonationsByUser = () => {
  return dispatch => {
    axios.get("http://localhost:8888/api/donations/").then(res => {
      dispatch({
        type: GET_DONATIONS,
        payload: res.data
      });
    });
  };
};

export const deleteDonation = (id, reload) => {
  return dispatch => {
    axios
      .delete(`http://localhost:8888/api/donations/${id}`)
      .then(res => {
        reload();
      })
      .catch(err => console.log(err));
  };
};

export const takeDonationToTicket = donation => {
  return dispatch => {
    dispatch({
      type: DONATION_TO_TICKET,
      payload: donation
    });
  };
};
