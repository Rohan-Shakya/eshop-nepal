import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
