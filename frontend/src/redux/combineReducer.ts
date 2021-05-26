import { combineReducers } from "redux";
import productReducer from "./reducers/productReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
