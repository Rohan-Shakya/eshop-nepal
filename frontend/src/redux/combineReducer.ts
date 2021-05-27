import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import UserLoginReducer from "./reducers/userLoginReducer";

const combinedReducers = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
  userLogin: UserLoginReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
