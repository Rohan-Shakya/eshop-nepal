import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import UserReducer from "./reducers/userReducer";
import orderCreateReducer from "./reducers/orderCreateReducer";
import orderDetailsReducer from "./reducers/orderDetailsReducer";
import orderListReducer from "./reducers/orderListReducer";
import userListReducer from "./reducers/userListReducer";
import userUpdateReducer from "./reducers/userUpdateReducer";
import productDeleteReducer from "./reducers/productDeleteReducer";
import productCreateReducer from "./reducers/productCreateReducer";
import productUpdateReducer from "./reducers/productUpdateReducer";

const combinedReducers = combineReducers({
  // Products
  productState: productReducer,
  productDeleteState: productDeleteReducer,
  productCreateState: productCreateReducer,
  productUpdateState: productUpdateReducer,

  // Cart
  cartState: cartReducer,

  // User
  userState: UserReducer,
  userDetailsState: userDetailsReducer,

  // Orders
  orderCreateState: orderCreateReducer,
  orderDetailsState: orderDetailsReducer,
  orderListState: orderListReducer,

  // Users
  userListState: userListReducer,
  userUpdateState: userUpdateReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
