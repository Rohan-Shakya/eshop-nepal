import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import UserReducer from "./reducers/userReducer";
import orderCreateReducer from "./reducers/orderCreateReducer";
import orderDetailsReducer from "./reducers/orderDetailsReducer";
import orderListReducer from "./reducers/orderListReducer";
import allOrderListReducer from "./reducers/allOrderListReducer";
import userListReducer from "./reducers/userListReducer";
import userUpdateReducer from "./reducers/userUpdateReducer";
import productDeleteReducer from "./reducers/productDeleteReducer";
import productCreateReducer from "./reducers/productCreateReducer";
import productUpdateReducer from "./reducers/productUpdateReducer";
import orderDeliveredReducer from "./reducers/orderDeliveredReducer";
import productReviewCreateReducer from "./reducers/productReviewCreateReducer";
import productTopRatedReducers from "./reducers/productTopRatedReducer";

const combinedReducers = combineReducers({
  // Products
  productState: productReducer,
  productDeleteState: productDeleteReducer,
  productCreateState: productCreateReducer,
  productUpdateState: productUpdateReducer,
  productReviewCreateState: productReviewCreateReducer,
  productTopRatedState: productTopRatedReducers,

  // Cart
  cartState: cartReducer,

  // User
  userState: UserReducer,
  userDetailsState: userDetailsReducer,

  // Orders
  orderCreateState: orderCreateReducer,
  orderDetailsState: orderDetailsReducer,
  orderListState: orderListReducer,
  allOrderListState: allOrderListReducer,
  orderDeliveredState: orderDeliveredReducer,

  // Users
  userListState: userListReducer,
  userUpdateState: userUpdateReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
