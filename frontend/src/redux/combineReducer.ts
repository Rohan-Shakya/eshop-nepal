import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import UserReducer from "./reducers/userReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
  userState: UserReducer,
  userDetailsState: userDetailsReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
