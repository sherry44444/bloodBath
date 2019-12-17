import {
  POST_DONATION,
  GET_DONATIONS,
  DONATION_TO_TICKET
} from "../actions/types";
const initialState = [];

const donationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DONATION:
      return [...state, action.payload];
    case GET_DONATIONS:
      return action.payload;
    case DONATION_TO_TICKET:
      return action.payload;
    default:
      return state;
  }
};

export default donationReducer;
