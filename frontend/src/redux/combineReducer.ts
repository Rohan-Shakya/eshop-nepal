import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import UserReducer from "./reducers/userReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
  userState: UserReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
