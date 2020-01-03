import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./Reducers/rootReducer";

import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose
  )
);

export default store;
