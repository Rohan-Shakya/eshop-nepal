import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import UserReducer from "./reducers/userReducer";
import orderCreateReducer from "./reducers/orderCreateReducer";
import orderDetailsReducer from "./reducers/orderDetailsReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
  userState: UserReducer,
  userDetailsState: userDetailsReducer,
  orderCreateState: orderCreateReducer,
  orderDetailsState: orderDetailsReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
