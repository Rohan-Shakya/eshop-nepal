import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "./combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
