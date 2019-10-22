const initialState = {
  pending: [],
  history: []
};

const donationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_DONATIONS":
      return { ...state, pending: [...state.pending, ...action.payload] };
    case "GET_PENDING":
      return { ...state, pending: [...action.payload] };
    case "GET_HISTORY":
      return { ...state, history: [...action.payload] };
    default:
      return state;
  }
};

export default donationReducer;
