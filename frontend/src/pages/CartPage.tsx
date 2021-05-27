import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootState } from "../redux/combineReducer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

const CartPage = ({
  match,
  location,
}: RouteComponentProps<{ id?: string }>) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const { cartItems } = useSelector((state: RootState) => state.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
};

export default CartPage;
