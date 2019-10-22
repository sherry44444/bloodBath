import axios from "axios";

export const getDonationsByUser = () => {
  return dispatch => {
    axios.get("http://localhost:8888/api/donations/logged_in").then(res => {
      let pending = [];
      let done = [];
      res.data.map(don => {
        if (don.isFinished === true) {
          done.push(don);
        } else {
          pending.push(don);
        }
      });
      dispatch({
        type: "GET_PENDING",
        payload: pending
      });
      dispatch({
        type: "GET_HISTORY",
        payload: done
      });
    });
  };
};

export const deleteDonation = (id, callback1) => {
  return dispatch => {
    axios.delete(`http://localhost:8888/api/donations/${id}`).then(res => {
      console.log(res);
      callback1();
    });
  };
};
